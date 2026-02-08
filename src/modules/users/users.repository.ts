import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/users.entities";

@Injectable()
export class UsersRepository {

    constructor(@InjectRepository(User) private repo:Repository<User>){}
    async findByUsername(username: string) {
      return this.repo.findOne({
        where: { username },
        select: ['id', 'username', 'password'], // ensure id is included
      });
    }
    // Create and save a new user
    createUser(userData: Partial<User>) {
        const user = this.repo.create(userData);
        return this.repo.save(user);
      }
}