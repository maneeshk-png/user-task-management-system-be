// dto/login.dto.ts
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString() // Validation: username must be a string
  username: string;

  @IsString() // Validation: password must be a string
  password: string;
}