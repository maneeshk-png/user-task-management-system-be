import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

/**
 * JwtStrategy handles authentication using JWT tokens.
 * 
 * Passport will call the validate() method automatically for requests
 * that include a valid JWT in the Authorization header.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name); // Logger instance

  constructor(private configService: ConfigService) {
    // Get JWT secret from environment/config
    const secret = configService.get<string>('JWT_SECRET');

    // Fail fast if secret is not defined
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      // Extract JWT from Authorization header as Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Do NOT allow expired tokens
      secretOrKey: secret,      // Secret key to verify JWT signature
    });

    this.logger.log('JWT strategy initialized'); // optional log
  }

  /**
   * Called automatically by Passport for validated JWT tokens.
   *
   * @param payload - The decoded JWT payload
   * @returns user object attached to req.user
   */
  async validate(payload: any) {
    this.logger.log(`JWT validated for user: ${payload.username}`); // optional log

    // Attach user info to req.user
    // 'sub' is usually user ID in JWT standards
    return { id: payload.sub, username: payload.username };
  }
}
