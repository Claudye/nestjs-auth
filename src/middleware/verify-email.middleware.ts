import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { RCODES } from "src/constants";

@Injectable()
export class VerifyEmailMiddleware implements NestMiddleware {
    constructor(private authService: AuthService) {

    }
    async use(req: any, res: any, next: (error?: any) => void) {
        let auth = req.body.__auth__;
        if (!auth) {
            throw new UnauthorizedException();
        }
        if (auth.email_verified_at != null) {
            next()
        }
        res.status(401)
        return res.send({
            responsecode: RCODES.USER_AUTHENTIFICATE,
            status: false,
            message: 'User must verify email adresse'
        })
    }
}