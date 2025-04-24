import {Controller, HttpCode, Patch, Post, UseGuards,} from '@nestjs/common';
import {StatusCodes} from 'http-status-codes';
import {UserService} from '../service/user.service';
import {ApiKeyGuard} from '../utils/api-key.guard';
import {RoleGuard} from '../utils/role.guard';
import {Roles} from '../utils/role.decorator';
import {Role} from '../entity/role.enum';
import {CreateUser} from '../dto/request/create/create-user.decorator';
import {CreateUserRequest} from '../dto/request/create/create-user.request';
import {UserResponse} from '../dto/response/user.response';
import {UpdateUserPassword} from '../dto/request/update/update-user-pass.decorator';
import {UpdateUserPassRequest} from '../dto/request/update/update-user-pass.request';

@Controller('user')
export class UserController {
  public constructor(private readonly service: UserService) {}

  @Post()
  @UseGuards(ApiKeyGuard, RoleGuard)
  @Roles(Role.Manager)
  @HttpCode(StatusCodes.CREATED)
  public async executeCreateUser(@CreateUser() request: CreateUserRequest): Promise<UserResponse> {
    return this.service.createUser(request);
  }

  @Patch('/password')
  @UseGuards(ApiKeyGuard, RoleGuard)
  @Roles(Role.Technician, Role.Manager)
  @HttpCode(StatusCodes.OK)
  public async executeUpdatePassword(@UpdateUserPassword() request: UpdateUserPassRequest): Promise<UserResponse> {
    return this.service.updatePassword(request);
  }
}
