import {ExceptionFilter,Catch,ArgumentsHost,HttpException,HttpStatus} from '@nestjs/common'; //imports nest js tools for building a custom exception handler
  import { Request, Response } from 'express';  //import express req/res types
  
  //catch all the expceptions
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {

    //this method runs automatically whenever error occurs
    catch(exception: unknown, host: ArgumentsHost) {

      //switch execution context to http
      const ctx = host.switchToHttp();
      //get express response object
      const response = ctx.getResponse<Response>();
      //get express req object
      const request = ctx.getRequest<Request>();
  
      //determine http status
      //If it's a known HttpException, use its status
    // Otherwise return 500 Internal Server Error
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

          //extract the  exception response body 
      const exceptionResponse =
        exception instanceof HttpException
          ? exception.getResponse()
          : 'Internal server error';
  
          //deafault message and errors
      let message = 'Something went wrong';
      let errors: any = null;
  
        // If response is string
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        //if it is object
      } else if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || message;
        errors = (exceptionResponse as any).message || null;
      }
  

      response.status(status).json({
        success: false,  //indicates req failed
        statusCode: status, //http status code
        message, //main error message
        errors, //detailed validation error
        timestamp: new Date().toISOString(),  //when error occured
        path: request.url,  //which api endpoint caused error
      });
    }
  }
  