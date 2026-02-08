import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from 'class-transformer';
import { UsersRepository } from './users.repository';
import { User } from './entities/users.entities';

@Module({
    imports:[
        TypeOrmModule.forFeature([User]) // Register User entity with TypeORM
    ],
    providers:[UsersRepository], // Register UsersRepository as a provider
    controllers:[], // No controllers for now
    exports:[UsersRepository]  
})
export class UsersModule {}
