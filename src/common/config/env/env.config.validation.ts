import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'dev',
  Production = 'prod',
  Local = 'local',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  PORT: number;
  DATABASE_SYSTEM_IDS: string;
  DB_MYSQL_TYPE: string;
  DB_MYSQL_HOST: string;

  DB_MYSQL_PORT: number;
  DB_MYSQL_USERNAME: string;
  DB_MYSQL_PASSWORD: string;
  DB_MYSQL_DATABASE: string;
  DB_MYSQL_SYNCHRONIZE: string;
  DB_MONGO_TYPE: string;
  DB_MONGO_HOST: string;

  DB_MONGO_PORT: number;
  DB_MONGO_USERNAME: string;
  DB_MONGO_PASSWORD: string;
  DB_MONGO_DATABASE: string;
  DB_MONGO_SYNCHRONIZE: string;
  DB_MYSQL_ENTITIES: string;
  DB_MONGO_ENTITIES: string;

  BCRYPT_SALT: number;
  API_PREFIX: string;
  TOKEN: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
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
