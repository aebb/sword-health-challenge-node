import {
  Controller, Get, HttpCode, Patch, Post, UseGuards,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { RoleGuard } from '../../users/utils/role.guard';
import { Roles } from '../../users/utils/role.decorator';
import { ApiKeyGuard } from '../../users/utils/api-key.guard';
import { Role } from '../../users/entity/role.enum';
import { TaskService } from '../service/task.service';
import { CreateTask } from '../dto/request/create/create-task.decorator';
import { CreateTaskRequest } from '../dto/request/create/create-task.request';
import { ListTaskRequest } from '../dto/request/list/list-task.request';
import { ListTask } from '../dto/request/list/list-task.decorator';
import { TaskResponse } from '../dto/response/task.response';
import {UpdateTask} from "../dto/request/update/update-task.decorator";
import {UpdateTaskRequest} from "../dto/request/update/update-task.requests";

@Controller('task')
export class TaskController {
  public constructor(
    private readonly service: TaskService,
  ) {
  }

  @Post()
  @UseGuards(ApiKeyGuard, RoleGuard)
  @Roles(Role.Technician)
  @HttpCode(StatusCodes.CREATED)
  public async executeCreateTask(@CreateTask() request: CreateTaskRequest): Promise<TaskResponse> {
    return this.service.createTask(request);
  }

  @Patch('/:id')
  @UseGuards(ApiKeyGuard, RoleGuard)
  @Roles(Role.Manager, Role.Technician)
  @HttpCode(StatusCodes.OK)
  public async executeUpdateDescription(@UpdateTask() request: UpdateTaskRequest): Promise<TaskResponse> {
    return this.service.updateDescription(request);
  }

  @Get()
  @UseGuards(ApiKeyGuard, RoleGuard)
  @Roles(Role.Manager, Role.Technician)
  @HttpCode(StatusCodes.OK)
  public async executeListTasks(@ListTask() request: ListTaskRequest): Promise<TaskResponse[]> {
    return this.service.listTasks(request);
  }
}
