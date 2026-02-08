import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// DTO for creating a new task
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

    @IsString()
    @IsOptional()
    status?: string;
}
