
// Import NestJS interceptor tools
import {
    CallHandler,  /// Handles the response stream
    ExecutionContext, // Provides details about current request
    Injectable,
    NestInterceptor,
    HttpStatus,
  } from '@nestjs/common';
  //// RxJS operator to transform data
  import { map } from 'rxjs/operators';
  import { Observable } from 'rxjs';
  
  // Marks this class as injectable so NestJS can use it globally
  @Injectable()
  export class ResponseInterceptor<T> implements NestInterceptor<T, any> {

      // Runs before the response is sent back to the client
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

      // Switch execution context to HTTP to access response object
      const response = context.switchToHttp().getResponse();

      // Get current HTTP status code (default to 200 OK)
      const statusCode = response.statusCode || HttpStatus.OK;
  
      // next.handle() continues request flow and returns response data
      return next.handle().pipe(

      // map() transforms the outgoing response data
        map((data) => ({
          success: true,
          statusCode,
          message: 'Request successful',
          data,   //actual controller repsonse
          timestamp: new Date().toISOString(),  //when response sent
        })),
      );
    }
  }
  