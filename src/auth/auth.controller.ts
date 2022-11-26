import { Body, Controller, Get, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { get } from 'http';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResetPassDto } from 'src/users/dto/reset-pass.dto';
import { UsersService } from 'src/users/users.service';
import { userToObject } from 'src/users/utils';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto';
import { LocalAuthGuard } from './local-auth.guard';
import { VerifyEmail } from './parts/verify-email';
@Controller('auth')
export class AuthController {

    constructor(
      private authService: AuthService,
      private usersService: UsersService) {
        
    }
    /**
     * Responsible for creating user account
     * @param createUserDto 
     * @param response 
     * @returns 
     */
    @Post('register')
    async register(@Body() createUserDto: RegisterUserDto, @Res() response){
      const res = await this.authService.register(createUserDto).then(access_token=>{
        return {
          data: access_token
         }
      }).catch(error=>{
        response.status(500)
        console.log(error)
        return response.send({
          status: false,
          message: "Failed to create user"
        })
      })
      return response.send(res)
    }

    @Post('login')
    async login(@Body() body){
      return this.authService.login(body)
    }

    resetPassword (@Body() resetPassDto: ResetPassDto){
      // get old password, and check if user can process
    }

    forgotPassword() {
      //generate en email to user
    }
    /**
     * /verify-email/userid/token
     */
     @Get('verify-email')
    verifyEmail(@Req() request) {
        let expires, email, userid, bearer_token:string ;
        bearer_token = request.headers.authorization as string ;
        const jwt_token = bearer_token.replace('Bearer','').trim()
        const auth = this.authService.auth({
          access_token:jwt_token
        })
        //const verifyEmail = new VerifyEmail()
        return auth
    }
}
