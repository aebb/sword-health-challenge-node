import { Task } from '../entity/task.entity';
import { User } from '../../users/entity/user.entity';

export interface TaskRepositoryInterface {
  listAllTasks(limit: number, offset: number): Promise<Task[]>
  listAllTasksByUser(user: User, limit: number, offset: number): Promise<Task[]>
  persist(entity: Task): Promise<Task>
  findById(id: number): Promise<Task>
}
