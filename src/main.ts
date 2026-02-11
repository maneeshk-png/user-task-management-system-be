import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { GlobalValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //cors origin resource sharing
app.enableCors({
  origin:'http://localhost:4200',
  credentials:true,
})

  app.useGlobalPipes(GlobalValidationPipe); //Register Global pipes 
  app.useGlobalFilters(new HttpExceptionFilter()); // Register HttpGlobal Filters Globally
  app.useGlobalInterceptors(new ResponseInterceptor()); //Register Response Interceptor Globally
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
