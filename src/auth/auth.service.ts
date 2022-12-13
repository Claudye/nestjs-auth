import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JWT_AUTH_KEY } from 'src/constants/env';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto';
import { HashService } from 'src/hash/hash.service';
import { AuthAccessToken } from './types';
import { EncryptionService } from 'src/encryption/encryption.service';
import { AuthModule } from './auth.module';
import { RCODES } from 'src/constants';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private hashService: HashService,
        private encrypt: EncryptionService
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
        const user = await this.attempt(data.email, data.password);
        if (user) {
            return await this.signAccessToken(user.id, user.email)
        }
        throw new UnauthorizedException();
    }

    async register(registerUserDto: RegisterUserDto) {

        registerUserDto.password = await
            this.hashService.hash(
                registerUserDto.password
            )
        const user = await this.usersService.create(registerUserDto)
        const accessToken = await this.signAccessToken(
            user.id,
            user.email
        )

        return {
            access_token: accessToken,
            verify_email_token: this.generateVerifyEmailToken(user)
        }
    }
    /**
     * Get user authenticate
     * @returns 
     */
    auth(accessToken: AuthAccessToken) {
        const payload = this.jwtService.decode(accessToken.access_token)
        return this.usersService.findById(payload.sub)
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

        //this.usersService.update();
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
    async signAccessToken(userId: number | string, email: string): Promise<{ access_token: string; }> {
        const payload = { sub: userId, email: email };
        return {
            access_token: await this.jwtService.signAsync(
                payload, { secret: JWT_AUTH_KEY, expiresIn: AuthModule.JWT_TOKEN_EXPIRED_AT }

            )
        };
    }
    /**
     * Even if user has a good email verifing token if his isn't connected before,
     * He must provide his credentials before verification will pass
     * Return false if user not found
     * Return user if user is auth
     * if user is authentificated return access token
     * @param token 
     * @param jwtToken 
     * @returns 
     */
    async verifyEmail(token: string, jwtToken?: string) {
        let userIsAuthentificated = false;
        const data: {
            userId: number,
            email: string,
            init: number
        } = JSON.parse(this.encrypt.decrypt(token))

        let user = await this.usersService.findById(data.userId)
        const isExpired = Date.now() - (data.init + AuthModule.VERIFY_EMAIL_EXPIRED_AT) <= 0;

        if (jwtToken) {
            const payload: any = this.jwtService.decode(jwtToken)
            userIsAuthentificated = user.id == payload.sub
        }
        //
        if ((user.email == data.email) && !isExpired) {
            if (!userIsAuthentificated) {
                return await this.signAccessToken(user.id, user.email)               
            } else {
                user =await this.usersService.update(user,{email_verified_at:Date.now()})
                delete user.password
                return user
            }
        }
        return false;
    }

    generateVerifyEmailToken(user: any) {
        const data = {
            userId: user.id,
            email: user.email,
            init: Date.now()
        }
        return this.encrypt.encrypt(
            JSON.stringify(data)
        )
    }
}
