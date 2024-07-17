import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env.validation';
import envConfiguration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        'apps/patient/.env.development',
        'apps/patient/.env.production',
      ],
      isGlobal: true,
      load: [envConfiguration],
      validate: validateEnv,
    }),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
