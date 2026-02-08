import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_CONSTANTS } from '../constants/auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // read Bearer token
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANTS.secret, // use the configured JWT secret
    });
  }

  async validate(payload: any) {
    // attach to req.user
    return { id: payload.sub, username: payload.username };
  }
}
