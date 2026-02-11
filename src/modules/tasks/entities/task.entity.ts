import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TaskStatus } from '../domain/task-status.enum';
import { User } from 'src/modules/users/entities/users.entities';

// Entity representing a task in the database
@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number; // Auto-generated primary key

  @Column()
  title: string; // Task title

  @Column({ nullable: true }) //
  description: string; // Optional task description

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO }) // Task
  status: TaskStatus; // Task status with default value 'TODO'

  @Column({ type: 'uuid' })
  ownerId: string; // ID of the user who owns the task

  @CreateDateColumn()
  createdAt: Date; // Timestamp for when the task was created

  @UpdateDateColumn()
  updatedAt: Date; // Timestamp for when the task was last updated

@ManyToOne(() => User, user => user.tasks, { onDelete: 'CASCADE' })
owner: User;

}
