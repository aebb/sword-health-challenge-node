import { Task } from '../../../tasks/entity/task.entity';
import { User } from '../../entity/user.entity';

export class UserResponse {
  private readonly id: string;

  private readonly userName: string;

  private readonly tasks: Promise<Task[]>;

  private readonly createdAt: Date;

  private readonly updatedAt: Date;

  public constructor(entity: User) {
    this.id = entity.id;
    this.userName = entity.username;
    this.tasks = entity.tasks;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
