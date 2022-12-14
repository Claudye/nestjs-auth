import { Body, Controller, Get, Param, Post, Req, Request, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { RCODES } from 'src/constants';
import { EncryptionService } from 'src/encryption/encryption.service';
import { HashService } from 'src/hash/hash.service';

import { ResetPassDto } from 'src/users/dto/reset-pass.dto';
import { User } from 'src/users/entities/User';
import { UsersService } from 'src/users/users.service';
import { jwt_access_token_from_req } from 'src/utils/helpers';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto';
@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private encrypter: EncryptionService,
    private hash: HashService,
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
  /**
   * 
   * @param body 
   * @param response 
   */
  @Post('forgot-password')
  async forgotPasswordToken(@Body() body: { email: string }, @Res() response) {
    let statusCode = 200, message = "Ok", status = true;
    const r = await this.authService.forgotPassword(body.email)
    if (!r) statusCode = 404; status = false; message = "User not found"
    response.status(statusCode)
    response.send({
      status: status,
      message: message,
      data: {
        forgot_token: r
      }
    })
  }

  /**
 * 
 * @param body 
 * @param response 
 */
  @Post('forgot-password')
  async forgotPassword(@Body() body: { pass: string, cpass: string, token: string }, @Res() response) {
    let statusCode = 200, message = "Ok", status = false, user;
    const jsonValue = this.encrypter.decrypt(body.token)
    let obj = JSON.parse(jsonValue);
    if (obj && obj.userId) {
      const isExpired = Date.now() - (Number(obj.init) + AuthModule.VERIFY_EMAIL_EXPIRED_AT) >= 0;
      user = await this.usersService.findById(obj.userId);
      if (isExpired) {
        statusCode = 403
        message = "Token expired"

      }

      if (!user) {
        statusCode = 404
      }

      if (body.pass !== body.cpass) {
        statusCode = 404
        message = "Password and confirm password are not the same"
      }
      if (!isExpired && user && body.pass === body.cpass) {
        user =this.usersService.update(
          user,
          { password: await this.hash.hash(body.cpass) }
        )
        status = true
      }
    }
    response.status(statusCode)
    response.send({
      status: status,
      message: message,
      data: {
        user: user
      }
    })
  }
  /**
   * /verify-email/token
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
      data: res
    })
  }
  @Post('resend-email-token')
  resendEmailValidationToken(@Req() req) {
    return {
      verify_email_token: this.authService.generateVerifyEmailToken(req.body.__auth__)
    }
  }
}
