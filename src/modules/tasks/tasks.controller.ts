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

@Controller(taskRoutes.BASE)
@UseGuards(AuthGuard('jwt')) // protect all task routes with JWT
export class TasksController {
  private readonly logger = new Logger(TasksController.name);

  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: any, @Req() req: any) {
    this.logger.log(`req.user: ${JSON.stringify(req.user)}`);
    // create a task for the authenticated user
    return this.tasksService.createTask(req.user?.id, createTaskDto);
  }

  @Get()
  getAll(@Query() filters: any, @Req() req: any) {
    // list tasks for the authenticated user with filters
    return this.tasksService.getTasks(req.user.id, filters);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    // get a single task by id for the authenticated user
    return this.tasksService.getTaskById(req.user.id, id);
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
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    // delete a task for the authenticated user
    return this.tasksService.deleteTask(req.user.id, id);
  }
}
