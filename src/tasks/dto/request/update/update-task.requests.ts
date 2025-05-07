import {
  IsNotEmpty, IsNumberString, IsString, Length,
} from 'class-validator';
import { AuthenticatedRequest } from '../../../../users/dto/request/auth/authenticated.request';
import { UpdateTaskInterface } from './update-task.interface';
import { User } from '../../../../users/entity/user.entity';

export class UpdateTaskRequest extends AuthenticatedRequest implements UpdateTaskInterface {
  @IsNotEmpty()
  @IsString()
  @Length(1, 2500)
  private readonly summary: string;

  @IsNotEmpty()
  @IsNumberString()
  private readonly id: string;

  public constructor(user: User, summary: string, taskId: string) {
    super(user);
    this.summary = summary;
    this.id = taskId;
  }

  public getSummary(): string {
    return this.summary;
  }

  public getId(): number {
    return +this.id;
  }
}
