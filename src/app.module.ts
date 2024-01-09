import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaceModule } from './place/place.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PlaceModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
