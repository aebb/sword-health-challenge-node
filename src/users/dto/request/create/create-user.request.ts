import {
  ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsString,
} from 'class-validator';
import { AuthenticatedRequest } from '../auth/authenticated.request';
import { CreateUserInterface } from './create-user.interface';
import { Role } from '../../../entity/role.enum';
import { User } from '../../../entity/user.entity';
import { Task } from '../../../../tasks/entity/task.entity';

export class CreateUserRequest extends AuthenticatedRequest implements CreateUserInterface {
  @IsNotEmpty()
  @IsString()
  private readonly userName: string;

  @IsNotEmpty()
  @IsString()
  private readonly userPassword: string;

  @ArrayNotEmpty()
  @IsArray()
  @IsEnum(Role, { each: true })
  private readonly roles: Array<Role>;

  @IsArray()
  private readonly tasks: Promise<Task[]>;

  @IsNotEmpty()
  @IsString()
  private readonly apiKey: string;

  public constructor(user: User, userName: string, userPassword: string, roles: Array<Role>, apiKey: string, tasks: Promise<Task[]>) {
    super(user);
    this.userName = userName;
    this.userPassword = userPassword;
    this.roles = roles;
    this.apiKey = apiKey;
    this.tasks = tasks;
  }

  public getUserName(): string {
    return this.userName;
  }

  public getRoles(): Array<Role> {
    return this.roles;
  }

  public getPassword(): string {
    return this.userPassword;
  }

  public getApiKey(): string {
    return this.apiKey;
  }

  public getTasks(): Promise<Task[]> {
    return this.tasks;
  }
}
