import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.connectMicroservice({
    transport: Transport.TCP,
  });

  const host = process.env.AUTH_DB_HOST;
  // const port= 5433, // @audit this is only for testing
  const port = parseInt(process.env.AUTH_DB_PORT);
  const username = process.env.AUTH_DB_USERNAME;
  const database = process.env.AUTH_DB_NAME;
  const password = process.env.AUTH_DB_PASSWORD;

  console.log({
    host,
    port,
    username,
    database,
    password,
  });

  app.startAllMicroservices();

  await app.listen(2222);
}
bootstrap();
