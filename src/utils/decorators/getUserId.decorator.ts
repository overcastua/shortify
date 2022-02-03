import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserId = createParamDecorator(
  (_data, context: ExecutionContext): number => {
    const req = context.switchToHttp().getRequest();

    return req.user.id;
  },
);
