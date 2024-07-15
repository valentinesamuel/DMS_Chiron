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
  PATIENT_DB_HOST: string;

  @IsString()
  PATIENT_DB_PORT: string;

  @IsString()
  PATIENT_DB_USERNAME: string;

  @IsString()
  PATIENT_DB_NAME: string;

  @IsString()
  PATIENT_DB_PASSWORD: string;

  @IsString()
  RABBITMQ_USERNAME: string;

  @IsString()
  RABBITMQ_PASSWORD: string;

  @IsString()
  RABBITMQ_HOST: string;

  @IsString()
  RABBITMQ_PATIENT_QUEUE: string;

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
