import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const message = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      message,
      error: exception.name,
      timestamp: new Date().toISOString(),
    });
  }
}