import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { taskRoutes } from './constants/auth.constants';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/users.entities';

@Controller(taskRoutes.BASE)
@UseGuards(AuthGuard('jwt')) // protect all task routes with JWT
export class TasksController {
  private readonly logger = new Logger(TasksController.name);

  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: any,@CurrentUser() user:User ) {
    this.logger.log(`req.user: ${JSON.stringify(user)}`);
    // create a task for the authenticated user
    return this.tasksService.createTask(user?.id, createTaskDto);
  }

  @Get()
  getAll(@Query() filters: any, @CurrentUser() user:User) {
    // list tasks for the authenticated user with filters
    return this.tasksService.getTasks(user.id, filters);
  }

  //Get Task Summary
  @Get(taskRoutes.SUMMARY)
  getSummary(@CurrentUser() user:User){
    return this.tasksService.getSummary(user.id);
  }

 //Get  Task by id
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number,@CurrentUser() user:User) {
    // get a single task by id for the authenticated user
    return this.tasksService.getTaskById(user.id, id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: any,
    @Req() req: any,
  ) {
    // update a task for the authenticated user
    return this.tasksService.updateTask(req.user.id, id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user:User) {
    // delete a task for the authenticated user
    return this.tasksService.deleteTask(user.id, id);
  }

 
}
