import { UnauthorizedException } from "@nestjs/common";

export const jwt_access_token_from_req =(req:any, thr=true)=>{
    let token = req.headers.authorization as string;
      
    if (token) {
        token = token.replace('Bearer', '').trim()
    } else {
        if (thr) {
            throw new UnauthorizedException();
        }
    }

    return token
}