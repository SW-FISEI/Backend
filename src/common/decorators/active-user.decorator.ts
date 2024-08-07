import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

export const ActiveUser = createParamDecorator(
    (date: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.usuario;
    }
)