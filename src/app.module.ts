import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/entities/User';
import { HashModule } from './hash/hash.module';
import { ConfigModule } from '@nestjs/config';
import { EncryptionModule } from './encryption/encryption.module';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    database: 'nest_auth',
    port: 3306,
    username: 'root',
    password: '',
    synchronize: true,
    entities: [User]
  }),
  HashModule,
  ConfigModule.forRoot({
    isGlobal:true
  }),
  EncryptionModule
],
  controllers: [AppController],
  providers: [AppService, AuthService,JwtService],
})
export class AppModule {
  static ENCRYPTION_KEY_LENGHT= 16 ;
}
