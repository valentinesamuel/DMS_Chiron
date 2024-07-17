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

  const natsServerUrl = configService.get('NATS_SERVER_URL');

  app.connectMicroservice(sharedService.connectToNATSServer(natsServerUrl));
  app.startAllMicroservices();

  await app.listen(3333);
}
bootstrap();
