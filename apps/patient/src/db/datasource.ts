import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

export const PatientTypeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: configService.get<string>('PATIENT_DB_HOST'),
      port: parseInt(configService.get('PATIENT_DB_PORT')),
      // port: 5433, // @audit this is only for testing
      username: configService.get('PATIENT_DB_USERNAME'),
      database: configService.get('PATIENT_DB_NAME'),
      password: configService.get('PATIENT_DB_PASSWORD'),
      synchronize: false,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/db/migrations/*.js'],
    };
  },
};

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PATIENT_DB_HOST,
  port: parseInt(process.env.PATIENT_DB_PORT),
  username: process.env.PATIENT_DB_USERNAME,
  database: process.env.PATIENT_DB_NAME,
  password: process.env.PATIENT_DB_PASSWORD,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
