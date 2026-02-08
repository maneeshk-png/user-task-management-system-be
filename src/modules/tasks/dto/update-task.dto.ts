import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../domain/task-status.enum';

// DTO for updating an existing task
export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
