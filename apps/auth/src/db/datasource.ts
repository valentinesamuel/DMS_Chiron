import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

export const AuthTypeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: configService.get<string>('AUTH_DB_HOST'),
      port: parseInt(configService.get<string>('AUTH_DB_PORT')),
      username: configService.get<string>('AUTH_DB_USERNAME'),
      database: configService.get<string>('AUTH_DB_NAME'),
      password: configService.get<string>('AUTH_DB_PASSWORD'),
      synchronize: false,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/db/migrations/*.js'],
    };
  },
};

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.AUTH_DB_HOST,
  port: parseInt(process.env.AUTH_DB_PORT),
  username: process.env.AUTH_DB_USERNAME,
  database: process.env.AUTH_DB_NAME,
  password: process.env.AUTH_DB_PASSWORD,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
