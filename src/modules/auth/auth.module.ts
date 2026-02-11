import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/auth.guard';
import { LocalStrategy} from './strategies/local.strategy';
import { ConfigService } from '@nestjs/config';
import { getJwtConfig } from './jwt/jwt.config';

@Module({
imports: [UsersModule,PassportModule,JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory:getJwtConfig,
})],
controllers: [AuthController],
providers: [AuthService, PasswordService ,JwtStrategy, JwtAuthGuard, LocalStrategy], // SERVICES, STRATEGIES, GUARDS
})
export class AuthModule {}
