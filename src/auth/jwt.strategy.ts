import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { AuthUnauthorizedException } from './exceptions/auth-unauthorized-exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JwtStrategy || 'key',
    });
  }
  async validate(payload: { email: string; sub: number }) {
    const user = await this.authService.validateToken(payload.sub);
    if (!user) {
      throw new AuthUnauthorizedException();
    }
    return user;
  }
}
