import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.connectMicroservice({
    transport: Transport.TCP,
  });

  app.startAllMicroservices();

  await app.listen(2222);
}
bootstrap();
