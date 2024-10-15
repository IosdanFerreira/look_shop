// all-exceptions.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch() // Captura todas as exceções
export class UnauthorizedFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let error: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // Verifica se 'error' é um objeto e sobrescreve o campo "message"
    if (typeof error === 'object' && error.message) {
      error.message = 'Acesso não autorizado';
      error.error = 'Unauthorized';
    } else if (typeof error === 'string') {
      // Se for uma string, transforma em objeto e sobrescreve
      error = {
        message: 'Acesso não autorizado',
        error: 'Unauthorized',
      };
    }

    response.status(status).json({
      path: request.url,
      error,
    });
  }
}
