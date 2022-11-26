import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto';
import { HashService } from 'src/hash/hash.service';
import { AuthAccessToken } from './types';
export declare class AuthService {
    private usersService;
    private jwtService;
    private hashService;
    constructor(usersService: UsersService, jwtService: JwtService, hashService: HashService);
    attempt(email: string, password: string): Promise<import("../users/entities/User").User>;
    login(data: LoginUserDto): Promise<{
        access_token: string;
    }>;
    register(registerUserDto: RegisterUserDto): Promise<{
        access_token: string;
    }>;
    auth(accessToken: AuthAccessToken): string | {
        [key: string]: any;
    };
    resetPassword(email: string, pass: string, oldpass: string): Promise<void>;
    checkPassword(hash: string, password: string): Promise<boolean>;
    hash(str: string): Promise<string>;
    signAccessToken(userId: number | string, email: string): Promise<{
        access_token: string;
    }>;
}
