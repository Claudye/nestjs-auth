import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { RCODES } from "src/constants";
import { jwt_access_token_from_req } from "src/utils/helpers";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private authService: AuthService) {

    }
    async use(req: any, res: any, next: (error?: any) => void) {
        let token = jwt_access_token_from_req(req)
        const auth = await this.authService.auth({
            access_token: token
        })
        if (!auth) {
            throw new UnauthorizedException();
        }
        req.body.__auth__ =  auth
        next();

    }
}