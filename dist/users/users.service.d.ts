import { Repository } from 'typeorm';
import { User } from './entities/User';
import { RegisterUserDto } from 'src/auth/dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: RegisterUserDto): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findById(id: number): Promise<User>;
    get(count?: number): Promise<User[]>;
    update(): void;
}
