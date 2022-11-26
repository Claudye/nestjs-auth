import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/User";
/**
 * Convert user to native javascript object
 * @param user 
 * @param hiddens 
 * @returns 
 */
export const userToObject =(user: CreateUserDto|User, hiddens:string[] =[])=>{
    let u:object = {};
    for (const key in user) {
        if (Object.prototype.hasOwnProperty.call(user, key)) {
            if (!hiddens.includes(key)) {
                u[key]= user[key]
            }
        }
    }

    return u
}