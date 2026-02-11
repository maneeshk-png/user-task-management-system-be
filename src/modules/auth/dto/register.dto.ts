// src/modules/auth/dto/register.dto.ts
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

/**
 *DTO for Register 
 * 
 * Ensures the registration payload is valid and secure.
 * Works with global ValidationPipe for automatic validation.
 */
export class RegisterDto {
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' }) // Prevent empty username
  @MaxLength(30, { message: 'Username must be at most 30 characters' }) // Optional limit
  username: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' }) // Prevent empty password
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(20, { message: 'Password must be at most 20 characters long' }) // Optional max length
  password: string;
}
