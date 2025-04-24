import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Services } from '../../services.enum';
import { UserRepositoryInterface } from '../repository/user.repository.interface';
import { CreateUserInterface } from '../dto/request/create/create-user.interface';
import { User } from '../entity/user.entity';
import { UserResponse } from '../dto/response/user.response';
import { UpdateUserPassInterface } from '../dto/request/update/update-user-pass.interface';

@Injectable()
export class UserService {
  public constructor(
    @Inject(Services.UserRepository)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  public async createUser(request: CreateUserInterface): Promise<UserResponse> {
    const user = new User(
      request.getUserName(),
      request.getRoles(),
      request.getPassword(),
      request.getApiKey(),
      request.getTasks(),
    );

    await this.userRepository.persist(user);

    return new UserResponse(user);
  }

  public async updatePassword(request: UpdateUserPassInterface): Promise<UserResponse> {
    const user = await this.userRepository.findOneByApiKey(request.getUser().getIdentifier());

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.setPassword(request.getPassword());

    await this.userRepository.persist(user);

    return new UserResponse(user);
  }
}
