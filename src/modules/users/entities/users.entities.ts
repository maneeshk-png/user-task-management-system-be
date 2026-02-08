import { Task } from "src/modules/tasks/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users') //table name
export class User{  
@PrimaryGeneratedColumn('uuid') //auto generated ID
id:string;

@Column({unique:true}) //username must be unique
username:string;

@Column()
password:string;

@OneToMany(() => Task, task => task.owner)
tasks: Task[]
}