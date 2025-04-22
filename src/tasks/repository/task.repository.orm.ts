import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskRepositoryInterface } from './task.repository.interface';
import { Task } from '../entity/task.entity';
import { User } from '../../users/entity/user.entity';

@Injectable()
export class TaskRepositoryORM implements TaskRepositoryInterface {
  public constructor(
    @InjectRepository(Task) private readonly entityManager: Repository<Task>,
  ) {
  }

  public async persist(entity: Task): Promise<Task> {
    return this.entityManager.save(entity);
  }

  public async listAllTasks(limit: number, offset: number): Promise<Task[]> {
    return this.entityManager.createQueryBuilder('task')
      .innerJoinAndSelect('task.user', 'user')
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  public async listAllTasksByUser(user: User, limit: number, offset: number): Promise<Task[]> {
    return this.entityManager.createQueryBuilder('task')
      .innerJoinAndSelect('task.user', 'user')
      .where('user.id = :user')
      .setParameter('user', user.getIdentifier())
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  public async findById(entityId: string): Promise<Task> {
    return this.entityManager.createQueryBuilder('task')
      .where('task.id = :id', { id: parseInt(entityId) })
      .getOne();
  }
}
