import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaceModule } from './place/place.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PlaceModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
