import { Module } from '@nestjs/common';
import { PlaceModule } from './place/place.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PlaceModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
