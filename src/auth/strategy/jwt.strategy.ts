import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_AUTH_KEY } from "src/constants/env";
@Injectable()
export class JwtStrategy extends PassportStrategy (Strategy,'jwt') {
    constructor(){
        super({
            jwtFromRequest: 
            ExtractJwt.fromAuthHeaderAsBearerToken,
            secretOrKey:JWT_AUTH_KEY,
        });
    }

    validate(payload:any){
        console.log(payload)
        return payload
    }
}