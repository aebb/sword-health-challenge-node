import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UpdateUserPassRequest } from './update-user-pass.request';

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export const UpdateUserPassword = createParamDecorator(
  (data, ctx: ExecutionContext): UpdateUserPassRequest => {
    const req = ctx.switchToHttp().getRequest();

    return new UpdateUserPassRequest(
      req.user,
      req.body.password,
    );
  },
);
