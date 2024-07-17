import { NestFactory } from '@nestjs/core';
import { PatientModule } from './patient.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PatientModule);

  app.connectMicroservice({
    transport: Transport.TCP,
  });
  app.startAllMicroservices();

  await app.listen(3333);
}
bootstrap();
