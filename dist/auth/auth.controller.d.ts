import { ResetPassDto } from 'src/users/dto/reset-pass.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(createUserDto: RegisterUserDto, response: any): Promise<any>;
    login(body: any): Promise<{
        access_token: string;
    }>;
    resetPassword(resetPassDto: ResetPassDto): void;
    forgotPassword(): void;
    verifyEmail(request: any): string | {
        [key: string]: any;
    };
}
