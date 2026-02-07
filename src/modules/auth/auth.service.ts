import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { PasswordService } from './password.service';

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
}
