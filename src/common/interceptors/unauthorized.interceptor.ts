import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UnauthorizedError } from '../errors/types/UnauthorizedError';

@Injectable()
export class UnauthorizedInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: any) => {
        if (error instanceof UnauthorizedError) {
          throw new UnauthorizedException({
            message: 'teste',
            type: 'type test',
          });
        } else {
          throw error;
        }
      }),
    );
  }
}
