import { User } from "src/utils/types";
/**
 * When we get verify link, user must be connected before we validate his e-mail
 */
export class VerifyEmail{
    auth: User

    /**
     * Token expiration in minute
     */
    expires = 60
    /**
     * User making i
     */
    userId:number|string
    constructor(auth:User, userId:number|number, exp?:number){
        this.auth = auth
        this.userId = userId
        if (exp) {
            this.expires = exp
        }
    }

    generate(){
        return  this.createToken()
    }
    /**
     * 
     * @returns 
     */
    private createToken(){
        return this.auth.email
    }
    
    verify(token:string){
        return false
    }
}