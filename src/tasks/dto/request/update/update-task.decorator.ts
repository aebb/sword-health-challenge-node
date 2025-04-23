import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {UpdateTaskRequest} from "./update-task.requests";


export const UpdateTask = createParamDecorator(
    (data, ctx: ExecutionContext): UpdateTaskRequest => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const req = ctx.switchToHttp().getRequest();

        return new UpdateTaskRequest(
            req.user,
            req.body.summary ?? null,
            req.params.id,
        );
    },
);