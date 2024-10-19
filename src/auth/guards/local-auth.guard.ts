// NestJS
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

//Passport
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// Guardião de autenticação personalizada para a estratégia 'local'.
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new UnauthorizedException(err?.message);
    }

    return user;
  }
}
