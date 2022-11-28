import { Body, Controller, Get, Param, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EncryptionService } from 'src/encryption/encryption.service';
import { ResetPassDto } from 'src/users/dto/reset-pass.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto';
@Controller('auth')
export class AuthController {

    constructor(
      private authService: AuthService,
      private usersService: UsersService ) {
        
    }
    /**
     * Responsible for creating user account
     * @param createUserDto 
     * @param response 
     * @returns 
     */
    @Post('register')
    async register(@Body() createUserDto: RegisterUserDto, @Res() response){
      const res = await this.authService.register(createUserDto).then(data=>{
        return data
      }).catch(error=>{
        response.status(500)
        console.log(error)
        return response.send({
          status: false,
          message: "Failed to create user",
          data:null
        })
      })
      
      return response.send(res)
    }

    @Post('login')
    async login(@Body() body){
      return this.authService.login(body)
    }

    @Post('reset-password')
    resetPassword (@Body() resetPassDto: ResetPassDto){
      // get old password, and check if user can process
    }

    forgotPassword() {
      //generate en email to user
    }
    /**
     * /verify-email/userid/token
     */
    @Get('verify-email/:token')
    async verifyEmail(@Param() param, @Req() request) {

      //If has valid login token,validate email
      const auth = request.user
      //const verifyEmail = new VerifyEmail()
      return this.authService.verifyEmail(param.token)
    }
}
