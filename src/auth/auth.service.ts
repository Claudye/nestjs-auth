import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_AUTH_KEY } from 'src/constants/env';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto';
import { HashService } from 'src/hash/hash.service';
import { AuthAccessToken } from './types';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private hashService: HashService
        ) {
    }
    /**
     * 
     * @param email Check if user exists and authentificate it
     * @param password 
     * @returns 
     */
    async attempt(email: string, password: string) {
        const user = await this.usersService.findByEmail(email)
        if (user && this.checkPassword(user.password, password)) {
            return user
        }
        return null
    }

    /**
     * 
     * @param user Generate user accès token
     * @returns 
     */
    async login(data: LoginUserDto): Promise<{ access_token: string; }> {
        const user = await this.attempt(data.email, data.password) ;
        if (user) {
            return await this.signAccessToken(user.id, user.email)
        }
        throw new UnauthorizedException();
    }

    async register(registerUserDto: RegisterUserDto){
        const hash = await  this.hashService.hash(registerUserDto.password)
        registerUserDto.password = hash
        const user = await this.usersService.create(registerUserDto)
        return this.signAccessToken(user.id, user.email)
    }
    /**
     * Get user authenticate
     * @returns 
     */
    auth(accessToken: AuthAccessToken) {
        const payload = this.jwtService.decode(accessToken.access_token)
        return payload
    }

    async resetPassword(email: string, pass: string, oldpass: string) {
        const user = await this.usersService.findByEmail(email);
        const throw403 = () => {
            // Must be forbidden error
            throw new UnauthorizedException();
        }
        if (!user) {
            throw403()
        }
        if (!this.checkPassword(user.password, oldpass)) {
            throw403()
        }

        this.usersService.update();
    }
    /**
     * Verify password
     * @param hash 
     * @param password 
     * @returns 
     */
    checkPassword(hash: string, password: string) {
        return this.hashService.check(hash, password)
    }
    /**
     * Hash password
     * @param str 
     * @returns 
     */
    hash(str: string) {
        return this.hashService.hash(str)
    }

    /**
     * Generate access token
     * @param userId 
     * @param email 
     * @returns 
     */
    async signAccessToken(userId: number|string, email: string): Promise<{ access_token: string; }> {
        const payload = { sub: userId, email:email };

        return {
            access_token: await this.jwtService.signAsync(
                payload, { secret: JWT_AUTH_KEY, expiresIn: '172800m' }
            
                )
        };
    }
}
