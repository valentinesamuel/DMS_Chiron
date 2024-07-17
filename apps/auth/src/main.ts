import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { SharedService } from '@app/shared/services/shared.service';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const configService = app.get(ConfigService);

  const port = configService.get('PORT');
  console.log(port);
  console.log(`Listening on port ${port}`);

  const sharedService = app.get(SharedService);

  const natsServerUrl = configService.get('NATS_SERVER_URL');

  app.connectMicroservice(sharedService.connectToNATSServer(natsServerUrl));
  console.log('Starting all microservices');
  app.startAllMicroservices();

  await app.listen(2222);
}
bootstrap();
