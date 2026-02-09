import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../domain/task-status.enum';

// DTO for creating a new task
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

   @IsEnum(TaskStatus)
   @IsOptional()
    status?: TaskStatus;
}
