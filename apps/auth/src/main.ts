import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { SharedService } from '@app/shared/services/shared.service';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const configService = app.get(ConfigService);

  const port = configService.get('PORT');
  console.log(port);
  console.log(`Listening on port ${port}`);

  // const sharedService = app.get(SharedService);

  // const queue = configService.get('RABBITMQ_AUTH_QUEUE');

  // app.connectMicroservice(sharedService.getRmqOptions(queue));
  const microserviceOptions = {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 2222,
    },
  };
  app.connectMicroservice(microserviceOptions);
  app.startAllMicroservices();

  await app.listen(2222);
}
bootstrap();
