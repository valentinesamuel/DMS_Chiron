import { Controller, Get, Inject } from '@nestjs/common';
import { PatientService } from './patient.service';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    this.natsClient.emit('patient', 'Hello from Patient Service');
    return this.patientService.getHello();
  }

  @EventPattern('hello')
  createHello(@Payload() data: string) {
    console.log(data);
  }
}
