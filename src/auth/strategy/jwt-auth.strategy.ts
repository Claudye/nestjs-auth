import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-jwt' ;
import {JWT_AUTH_KEY} from 'src/constants/env';
@Injectable()
export class JwtAuthStratey extends PassportStrategy(Strategy, 'jwt-auth') {
	constructor(){
		super({
			jwtFromRequest:
				ExtractJwt.fromAuthHeaderAsBearerToken()
				secretOrKey:JWT_AUTH_KEY
		})
	}
}