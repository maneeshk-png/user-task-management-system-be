import { Repository } from "typeorm";
import { Task } from "../entities/task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";

@Injectable()
export class TasksRepository {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  //Create Task
  createTask(task: Partial<Task>) {
    const newTask = this.repo.create(task);
    return this.repo.save(newTask);
  }

  //create Many Task
  async createMany(ownerId:string,createTaskDto:CreateTaskDto[]){
    const tasks=createTaskDto.map(cTD=>
      this.repo.create({...cTD,ownerId})
    )
    return this.repo.save(tasks);
  }

  //find Task by Id
  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

//getTasks
async getTasks(ownerId: string, filters) {
  const { status, search, page = 1, limit = 10 } = filters;

  const pageNumber = Number(page) || 1;
  const limitNumber = Math.min(Number(limit) || 10, 50);

  const qb = this.repo.createQueryBuilder('task')
    .where('task.ownerId = :ownerId', { ownerId });

  if (status) {
    qb.andWhere('task.status = :status', { status });
  }

  if (search?.trim()) {
    qb.andWhere(
      '(task.title ILIKE :search OR task.description ILIKE :search)',
      { search: `%${search.trim()}%` },
    );
  }

  qb.orderBy('task.createdAt', 'DESC')
    .skip((pageNumber - 1) * limitNumber)
    .take(limitNumber);

  const [tasks, total] = await qb.getManyAndCount();

  return {
    data: tasks,
    total,
    page: pageNumber,
    limit: limitNumber,
  };
}



  //update Task
  updateTask(id: number, data: Partial<Task>) {
    return this.repo.update(id, data);
  }

  //Delete Task
  deleteTask(id: number) {
    return this.repo.delete(id);
  }

  //getTaskSummary
  async getTaskSummary(ownerId:string){
    const result=await this.repo.createQueryBuilder('task')
    .select('COUNT(*)','total')
    .addSelect(`COUNT(CASE WHEN task.status='todo' THEN 1 END)`,'todo')
    .addSelect(`COUNT(CASE WHEN task.status='in-progress' THEN 1 END)`,'inProgress')
    .addSelect(`COUNT(CASE WHEN task.status='done' THEN 1 END)`,'done')
    .where('task.ownerId=:ownerId',{ownerId})
    .getRawOne();

    return {
      total:Number(result.total),
      todo:Number(result.todo),
      inProgress:Number(result.inProgress),
      done:Number(result.done)
    }
  }


}
