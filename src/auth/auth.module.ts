import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy';
import { HashModule } from 'src/hash/hash.module';
import { JWT_AUTH_KEY } from 'src/constants/env';
import { EncryptionModule } from 'src/encryption/encryption.module';

@Module({
  imports:[
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_AUTH_KEY
    }),
    HashModule,
    EncryptionModule
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {
  static VERIFY_EMAIL_EXPIRED_AT= 172800
}
