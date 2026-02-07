import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { UsersModule } from '../users/users.module';

@Module({
imports: [UsersModule], // ✅ ONLY MODULES HERE
controllers: [AuthController],
providers: [AuthService, PasswordService],
})
export class AuthModule {}
