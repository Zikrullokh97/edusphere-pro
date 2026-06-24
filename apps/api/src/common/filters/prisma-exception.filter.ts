import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch()
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.getResponse();
      response.status(status).json({
        statusCode: status,
        message,
        error: exception.name,
      });
      return;
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      let message = 'Database error';
      if (exception.code === 'P2002') {
        message = 'A record with this value already exists';
      } else if (exception.code === 'P2025') {
        message = 'Record not found';
      }
      response.status(400).json({
        statusCode: 400,
        message,
        error: 'PrismaError',
      });
      return;
    }

    const status = 500;
    const message = exception instanceof Error ? exception.message : 'Internal server error';
    response.status(status).json({
      statusCode: status,
      message,
      error: 'InternalServerError',
    });
  }
}