import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_CONSTANTS } from '../constants/auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer token
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANTS.secret, // Use the secret from constants
    });
  }

  async validate(payload: any) {
    // This is attached to req.user
    return { userId: payload.sub, username: payload.username };
  }
}
