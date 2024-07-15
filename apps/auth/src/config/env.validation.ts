import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  AUTH_DB_HOST: string;

  @IsString()
  AUTH_DB_PORT: string;

  @IsString()
  AUTH_DB_USERNAME: string;

  @IsString()
  AUTH_DB_NAME: string;

  @IsString()
  AUTH_DB_PASSWORD: string;

  @IsString()
  RABBITMQ_USERNAME: string;

  @IsString()
  RABBITMQ_PASSWORD: string;

  @IsString()
  RABBITMQ_HOST: string;

  @IsString()
  RABBITMQ_AUTH_QUEUE: string;

  @IsString()
  RABBITMQ_DEFAULT_USER: string;

  @IsString()
  RABBITMQ_DEFAULT_PASS: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
