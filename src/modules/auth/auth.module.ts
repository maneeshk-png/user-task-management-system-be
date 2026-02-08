import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANTS } from './constants/auth.constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/auth.guard';
import { LocalStrategy} from './strategies/local.strategy';

@Module({
imports: [UsersModule,PassportModule,JwtModule.register({
    secret:JWT_CONSTANTS.secret,
    signOptions: { expiresIn: JWT_CONSTANTS.expiresIn }
})], // ✅ ONLY MODULES HERE
controllers: [AuthController],
providers: [AuthService, PasswordService ,JwtStrategy, JwtAuthGuard, LocalStrategy], // SERVICES, STRATEGIES, GUARDS
})
export class AuthModule {}
