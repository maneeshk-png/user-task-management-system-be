import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { RegisterDto } from './dto/register.dto';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * REGISTER USER
   */
  async register(dto: RegisterDto) {
    this.logger.log(`Register attempt: ${dto.username}`);

    const existingUser = await this.usersRepo.findByUsername(dto.username);
    if (existingUser) {
      this.logger.warn(`Username exists: ${dto.username}`);
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await this.passwordService.hashPassword(dto.password);

    const newUser = {
      username: dto.username,
      password: hashedPassword,
    };

    const savedUser = await this.usersRepo.createUser(newUser);

    const { password, ...userWithoutPassword } = savedUser;

    this.logger.log(`User registered: ${dto.username}`);

    return {
      message: 'User registered successfully',
      user: userWithoutPassword,
    };
  }

  /**
   * VALIDATE USER (used by LocalStrategy)
   */
  async validateUser(username: string, password: string) {
    this.logger.log(`Validating user: ${username}`);

    const user = await this.usersRepo.findByUsername(username);
    if (!user) {
      this.logger.warn(`User not found: ${username}`);
      return null;
    }

    const isMatch = await this.passwordService.comparePassword(password, user.password);
    if (!isMatch) { // Password mismatch
      this.logger.warn(`Password mismatch: ${username}`);
      return null;
    }

    const { password: _, ...result } = user;
    return result; // attached to req.user
  }

  /**
   * LOGIN (called AFTER LocalStrategy validation)
   */
  async login(user: any) {
    this.logger.log(`Login success: ${user.username}`); // user is from LocalStrategy's validate() return

    const payload = { username: user.username, sub: user.id }; // sub is standard JWT claim for user ID
    const { password, ...userWithoutPassword } = user; // Exclude password from response

    return {
      access_token: this.jwtService.sign(payload), // Generate JWT token
      user: userWithoutPassword, // Return user info without password
    };
  }
}
