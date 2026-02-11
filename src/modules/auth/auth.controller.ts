import { Body, Controller, Post, UseGuards, Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthRoutes } from './constants/auth.routes';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/users.entities';

/**
 * AuthController handles authentication-related routes:
 *  - /auth/register for user registration
 *  - /auth/login for user login
 */
@Controller(AuthRoutes.BASE)
export class AuthController {
  private readonly logger = new Logger(AuthController.name); // Logger instance

  constructor(private readonly authService: AuthService) {}

  /**
   * POST /auth/register
   * Register a new user
   */
  @Post(AuthRoutes.REGISTER)
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    this.logger.log(`New user registered: ${user.user.username}`);
    return user; // Ensure password is excluded in returned object
  }

  /**
   * POST /auth/login
   * Authenticate a user using LocalAuthGuard
   * Returns a JWT token if credentials are valid
   */
  @Post(AuthRoutes.LOGIN)
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user: User) {
    const token = await this.authService.login(user);
    this.logger.log(`User logged in: ${user.username}`);
    return token; // Typically { access_token: 'jwt_here' }
  }
}
