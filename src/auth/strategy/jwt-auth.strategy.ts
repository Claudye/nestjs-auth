import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-jwt' ;
import {JWT_AUTH_KEY} from 'src/constants/env';
import {UsersService} from 'src/users/users.service';
@Injectable()
export class JwtAuthStratey extends PassportStrategy(Strategy, 'jwt-auth') {
	constructor(private usersService: UsersService){
		super({
			jwtFromRequest:
				ExtractJwt.fromAuthHeaderAsBearerToken()
				secretOrKey:JWT_AUTH_KEY
		})
	}

	validate(payload: any){

	}
}