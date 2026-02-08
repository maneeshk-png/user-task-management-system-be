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
    const user = await this.usersRepo.findByUsername(username);
    if (user && await this.passwordService.comparePassword(password, user.password)) {
      const { password: _pw, ...result } = user; // keep id
      return result;
    }
    return null;
  }

  /**
   * LOGIN (called AFTER LocalStrategy validation)
   */
  async login(user: any) {
    const payload = { username: user.username, sub: user.id }; // include id
    return {
      access_token: this.jwtService.sign(payload),
      user, // or strip password if needed
    };
  }
}
