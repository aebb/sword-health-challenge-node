import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './service/auth.service';
import { Services } from '../services.enum';
import { UserRepositoryORM } from './repository/user.repository.orm';
import { User } from './entity/user.entity';
import { ApiKeyStrategy } from './utils/api-key.strategy';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UserRepositoryORM,
    ApiKeyStrategy,
    AuthService,
    {
      provide: Services.UserRepository,
      useClass: UserRepositoryORM,
    },
  ],
  exports: [Services.UserRepository, ApiKeyStrategy],
})
export class UsersModule {}
