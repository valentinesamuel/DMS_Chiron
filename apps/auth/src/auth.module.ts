import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env.validation';
import envConfiguration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthTypeOrmConfig } from './db/datasource';
import { DataSource } from 'typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['apps/auth/.env.development', 'apps/auth/.env.production'],
      isGlobal: true,
      load: [envConfiguration],
      validate: validateEnv,
    }),
    TypeOrmModule.forRootAsync(AuthTypeOrmConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  constructor(private dataSource: DataSource) {
    console.log('AuthModule.dataSource=====> ');
  }
}
