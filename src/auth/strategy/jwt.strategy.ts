import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_AUTH_KEY } from "src/constants/env";
import { UsersService } from "src/users/users.service";
@Injectable()
export class JwtStrategy extends PassportStrategy (Strategy,'jwt-new-user') {
    constructor(
        private usersService: UsersService
    ){
        super({
            jwtFromRequest: 
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:JWT_AUTH_KEY,
        });
    }

    async validate(payload:any){
        const user = await this.usersService.findById(payload.sub)
        return user
    }
}