import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

/**
 * LocalStrategy implements username/password authentication
 * using Passport's local strategy in NestJS.
 *
 * When a user tries to log in, Passport calls the validate() method
 * to verify credentials. If valid, the user object is attached to req.user.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name); // Logger instance for this class

  constructor(private readonly authService: AuthService) {
    // Call PassportStrategy constructor
    // Map request body fields to 'username' and 'password'
    super({ usernameField: 'username', passwordField: 'password' });
  }

  /**
   * Called automatically by Passport during login.
   *
   * @param username - The username from the request body
   * @param password - The password from the request body
   * @returns The validated user object, attached to req.user
   * @throws UnauthorizedException if credentials are invalid
   */
  async validate(username: string, password: string) {
    this.logger.log(`Login attempt for username: ${username}`); // Log every login attempt

    // Validate user credentials using AuthService
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      this.logger.warn(`Failed login attempt for username: ${username}`); // Warn on failure
      throw new UnauthorizedException('Invalid credentials'); // Throw 401 if invalid
    }

    this.logger.log(`Login successful for username: ${username}`); // Log success
    return user; // Attach validated user to req.user
  }
}
