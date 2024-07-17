import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(
    @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
  ) {}

  @Get()
  getHello() {
    this.natsClient.emit('hello', 'Hello from Auth Service');
    return {
      message: 'Check CLI for the message',
    };
  }

  @EventPattern('patient')
  createPatient(@Payload() data: string) {
    console.log(data);
  }
}
