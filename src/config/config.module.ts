import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,             // Makes config available everywhere
      envFilePath: '.env',        // Loads .env file
      validationSchema: envValidationSchema, // Validates env variables
    }),
  ],
})
export class AppConfigModule {}
