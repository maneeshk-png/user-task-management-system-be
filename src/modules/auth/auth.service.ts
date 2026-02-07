import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { PasswordService } from './password.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersRepo:UsersRepository,private readonly passwordService:PasswordService){}


    //Register New User
    async Register(dto:RegisterDto){
        //check for duplcate username
        const existingUser=await this.usersRepo.findByUsername(dto.username);

        if(existingUser){
            throw new ConflictException('Username already exists');
        }

        //Hash password
        const hashedPassword=await this.passwordService.hashPassword(dto.password);
        // 3️⃣ Prepare User entity
    const newUser = {
      username: dto.username,
      password: hashedPassword,
    };

    // 4️⃣ Save user to DB via repository
    const savedUser = await this.usersRepo.createUser(newUser);

    // 5️⃣ Remove password before returning
    const { password, ...userWithoutPassword } = savedUser;

    // 6️⃣ Return success response
    return {
      message: 'User registered successfully',
      user: savedUser,
    };
    }

    //Login User
    async login(dto:LoginDto){
      // Find user by username
      const user = await this.usersRepo.findByUsername(dto.username);
      
      // If user not found, throw error
      if (!user) {
        throw new ConflictException('Invalid username or password');
      }

      // Compare passwords
      const isPasswordValid = await this.passwordService.comparePassword(dto.password, user.password);
      
      // If password is invalid, throw error
      if (!isPasswordValid) {
        throw new ConflictException('Invalid username or password');
      }

      // If login successful, return user data (excluding password)
      const { password, ...userWithoutPassword } = user;
      return {
        message: 'Login successful',
        user: userWithoutPassword,
      };
    }
}
