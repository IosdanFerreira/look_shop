import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../models/authRequest';
import { UserEntity } from 'src/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
