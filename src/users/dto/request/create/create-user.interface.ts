import { Role } from '../../../entity/role.enum';
import { Task } from '../../../../tasks/entity/task.entity';
import { AuthenticatedRequestInterface } from '../auth/authenticated.interface';

export interface CreateUserInterface extends AuthenticatedRequestInterface {
  getUserName(): string;
  getRoles(): Array<Role>
  getPassword(): string;
  getApiKey(): string;
  getTasks(): Promise<Task[]>;
}
