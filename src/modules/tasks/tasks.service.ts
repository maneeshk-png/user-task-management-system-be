import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { TasksRepository } from "./repository/tasks.repository";

@Injectable()
export class TasksService {
  constructor(private tasksRepo: TasksRepository) {}

  createTask(userId: string, dto: any) {
    // create a new task for the authenticated user
    return this.tasksRepo.createTask({ ...dto, ownerId: userId });
  }

  getTasks(userId: string, filters: any) {
    // list tasks for the authenticated user
    return this.tasksRepo.getTasks(userId, filters);
  }

  async getTaskById(userId: string, id: number) {
    // fetch a single task and verify ownership
    const task = await this.tasksRepo.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    if (task.ownerId !== userId) throw new ForbiddenException();
    return task;
  }

  async updateTask(userId: string, id: number, dto: any) {
    // update a task after ownership check
    const task = await this.tasksRepo.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    if (task.ownerId !== userId) throw new ForbiddenException();

    await this.tasksRepo.updateTask(id, dto);
    return this.tasksRepo.findById(id);
  }

  async deleteTask(userId: string, id: number) {
    // delete a task after ownership check
    const task = await this.tasksRepo.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    if (task.ownerId !== userId) throw new ForbiddenException();

    await this.tasksRepo.deleteTask(id);
    return { message: 'Task deleted' };
  }
}
