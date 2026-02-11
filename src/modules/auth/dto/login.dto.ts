// dto/login.dto.ts
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

//DTO for User Login
export class LoginDto {
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' }) // Prevent empty username
  username: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' }) // Prevent empty password
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(20, { message: 'Password must be at most 20 characters long' })
  password: string;
}
