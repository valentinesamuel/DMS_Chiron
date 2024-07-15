import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env.validation';
import envConfiguration from './config/configuration';
import { SharedModule } from '@app/shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['apps/auth/.env.development', 'apps/auth/.env.production'],
      isGlobal: true,
      load: [envConfiguration],
      validate: validateEnv,
    }),
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
