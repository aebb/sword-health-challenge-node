import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CreateUserRequest } from './create-user.request';

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export const CreateUser = createParamDecorator(
  (data, ctx: ExecutionContext): CreateUserRequest => {
    const req = ctx.switchToHttp().getRequest();

    return new CreateUserRequest(
      req.user,
      req.body.username,
      req.body.password,
      req.body.roles,
      req.body.apiKey,
      req.body.tasks,
    );
  },
);
