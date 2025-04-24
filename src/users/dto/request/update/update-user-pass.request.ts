import { IsNotEmpty, IsString } from 'class-validator';
import { AuthenticatedRequest } from '../auth/authenticated.request';
import { User } from '../../../entity/user.entity';
import { UpdateUserPassInterface } from './update-user-pass.interface';

export class UpdateUserPassRequest extends AuthenticatedRequest implements UpdateUserPassInterface {
  @IsNotEmpty()
  @IsString()
  private readonly password: string;

  public constructor(user: User, password: string) {
    super(user);
    this.password = password;
  }

  public getPassword() {
    return this.password;
  }
}
