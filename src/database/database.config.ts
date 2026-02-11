// Type definition for TypeORM configuration object
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Used to access environment variables in a structured way
import { ConfigService } from '@nestjs/config';

// Function that returns database configuration dynamically
// It receives ConfigService so values come from .env
export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  
  // Database type
  type: 'postgres',

  // Database host (e.g., localhost or docker service name)
  host: configService.get<string>('POSTGRES_HOST'),

  // Database port (converted to number)
  port: configService.get<number>('POSTGRES_PORT'),

  // Database username
  username: configService.get<string>('POSTGRES_USER'),

  // Database password
  password: configService.get<string>('POSTGRES_PASSWORD'),

  // Database name
  database: configService.get<string>('POSTGRES_DB'),

  // Automatically loads all entities registered through feature modules
  autoLoadEntities: true,

  // Auto sync DB schema with entities (ONLY safe for development)
  // Disabled in production to prevent data loss
  synchronize: configService.get<string>('NODE_ENV') !== 'production',
});
