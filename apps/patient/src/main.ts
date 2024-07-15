import { NestFactory } from '@nestjs/core';
import { PatientModule } from './patient.module';
import { ConfigService } from '@nestjs/config';
import { SharedService } from '@app/shared/services/shared.service';

async function bootstrap() {
  const app = await NestFactory.create(PatientModule);

  const configService = app.get(ConfigService);

  const port = configService.get('PORT');

  console.log(`Listening on port ${port}`);

  const sharedService = app.get(SharedService);

  const queue = configService.get('RABBITMQ_PATIENT_QUEUE');
  console.log(queue);
  const USER = configService.get('RABBITMQ_USERNAME');
  const PASSWORD = configService.get('RABBITMQ_PASSWORD');
  const HOST = configService.get('RABBITMQ_HOST');
  console.log(queue, `amqp://${USER}:${PASSWORD}@${HOST}`);
  app.connectMicroservice(sharedService.getRmqOptions(queue));
  app.startAllMicroservices();

  await app.listen(3333);
}
bootstrap();
