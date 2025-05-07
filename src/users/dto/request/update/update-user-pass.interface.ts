import { AuthenticatedRequestInterface } from '../auth/authenticated.interface';

export interface UpdateUserPassInterface extends AuthenticatedRequestInterface {
  getPassword(): string;
}
