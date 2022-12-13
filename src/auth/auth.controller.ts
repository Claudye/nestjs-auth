import { Body, Controller, Get, Param, Post, Req, Request, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { RCODES } from 'src/constants';

import { ResetPassDto } from 'src/users/dto/reset-pass.dto';
import { User } from 'src/users/entities/User';
import { UsersService } from 'src/users/users.service';
import { jwt_access_token_from_req } from 'src/utils/helpers';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto';
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
  async register(@Body() createUserDto: RegisterUserDto, @Res() response) {
    const res = await this.authService.register(createUserDto).then(data => {
      return data
    }).catch(error => {
      response.status(500)
      console.log(error)
      return response.send({
        status: false,
        message: "Failed to create user",
        data: null
      })
    })

    return response.send(res)
  }

  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body)
  }

  @Post('reset-password')
  resetPassword(@Body() resetPassDto: ResetPassDto) {
    // get old password, and check if user can process
  }

  forgotPassword() {
    //generate en email to user
  }
  /**
   * /verify-email/userid/token
   */
  @Get('verify-email/:token')
  async verifyEmail(@Param() param, @Req() request, @Res() response) {
    let code = RCODES.USER_FOUND, status = false, statusCode = 200;
    //If has valid login token,validate email

    const res = await this.authService.verifyEmail(param.token, jwt_access_token_from_req(request))

    if (res == false) {
      throw new UnauthorizedException()
    } else if (res instanceof User) {
      code = RCODES.USER_EMAIL_VERIFIED;
    } else {
      code = RCODES.USER_AUTHENTIFICATE
      statusCode = 403
      status = true
    }
    response.status(statusCode)
    return response.send({
      responsecode: code,
      status: status,
      data:res
    })
  }
  @Post('resend-email-token')
  resendEmailValidationToken(@Req() req) {

    return {
      verify_email_token: this.authService.generateVerifyEmailToken(req.body.__auth__)
    }
  }
}
