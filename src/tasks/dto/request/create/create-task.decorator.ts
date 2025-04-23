import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CreateTaskRequest } from './create-task.request';

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export const CreateTask = createParamDecorator(
  (data, ctx: ExecutionContext): CreateTaskRequest => {
    const req = ctx.switchToHttp().getRequest();
    // plainToInstance(req, CreateTaskRequest)
    return new CreateTaskRequest(
      req.user,
      req.body.summary ?? null,
    );
  },
);

