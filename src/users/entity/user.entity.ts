import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Role } from './role.enum';
import { Task } from '../../tasks/entity/task.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ unique: true, nullable: false })
    username: string;

  @Column({ type: 'simple-array', nullable: false })
    roles: Role[];

  @Column({ nullable: false })
    password: string;

  @Column({ name: 'api_key', unique: true })
    apiKey: string;

  @OneToMany(() => Task, (task) => task.user, { cascade: true })
    tasks: Promise<Task[]>;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  constructor(username: string, roles: Role[], password: string, apiKey: string, tasks: Promise<Task[]>) {
    this.username = username;
    this.roles = roles;
    this.password = password;
    this.apiKey = apiKey;
    this.tasks = tasks;
  }

  public getIdentifier(): string {
    return this.id;
  }

  public getRoles(): Role[] {
    return this.roles;
  }

  public isManager(): boolean {
    return this.roles.includes(Role.Manager);
  }

  public setPassword(pass: string) {
    this.password = pass;
  }
}
