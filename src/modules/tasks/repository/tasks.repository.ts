import { Repository } from "typeorm";
import { Task } from "../entities/task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TasksRepository {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  createTask(task: Partial<Task>) {
    const newTask = this.repo.create(task);
    return this.repo.save(newTask);
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async getTasks(ownerId: string, filters) {
    const { status, search, page = 1, limit = 10 } = filters;

    const qb = this.repo.createQueryBuilder('task')
      .where('task.ownerId = :ownerId', { ownerId });

    if (status) qb.andWhere('task.status = :status', { status });
    if (search) qb.andWhere('task.title ILIKE :search', { search: `%${search}%` });

    qb.skip((page - 1) * limit).take(limit);

    const [tasks, total] = await qb.getManyAndCount();
    return { tasks, total };
  }

  updateTask(id: number, data: Partial<Task>) {
    return this.repo.update(id, data);
  }

  deleteTask(id: number) {
    return this.repo.delete(id);
  }
}
