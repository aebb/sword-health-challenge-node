import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../../users/entity/user.entity';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ nullable: false, length: 2500 })
    summary: string;

  @ManyToOne(() => User, (user) => user.tasks)
    user: User;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  public constructor(summary: string, user: User) {
    this.summary = summary;
    this.user = user;
  }

  public getIdentifier(): number {
    return this.id;
  }

  public getSummary(): string {
    return this.summary;
  }

  public getUser(): User {
    return this.user;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setSummary(summary: string) {
    this.summary = summary;
  }
}
