import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<{
        data: import("./entities/User").User[];
    }>;
    updateUser(): Promise<void>;
    createUser(): Promise<void>;
    profile(req: any): Promise<any>;
    getUser(): Promise<{
        data: import("./entities/User").User;
    }>;
}
