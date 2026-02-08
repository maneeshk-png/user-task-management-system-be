import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
    
    private readonly saltRounds = 10;
    // Hash a plain password
    async hashPassword(password:string):Promise<string>{
        return await bcrypt.hash(password,this.saltRounds);
    }
    // Compare plain password with hashed password
    async comparePassword(plainPassword:string,hashedPassword:string):Promise<boolean>{
        return await bcrypt.compare(plainPassword,hashedPassword);
    }
}