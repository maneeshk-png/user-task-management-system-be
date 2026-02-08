import { TaskStatus } from './task-status.enum';


// Interface representing a task entity
export interface ITask {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
}
