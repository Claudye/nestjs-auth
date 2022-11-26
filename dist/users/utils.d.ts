import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/User";
export declare const userToObject: (user: CreateUserDto | User, hiddens?: string[]) => object;
