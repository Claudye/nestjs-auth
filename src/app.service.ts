import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

@Injectable()
export class AppService {
  constructor (private config: ConfigService){
    this.checkKey()
  }
 
  private checkKey(){
    if (this.config.get('APP_KEY').length != (AppModule.ENCRYPTION_KEY_LENGHT*2)) {
      throw new Error("The app must be "+ AppModule.ENCRYPTION_KEY_LENGHT + " caracts");
      
    }
  }
}
