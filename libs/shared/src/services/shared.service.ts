import { Injectable } from '@nestjs/common';
import { SharedServiceInterface } from '../interfaces/shared.service.interface';
import { ConfigService } from '@nestjs/config';
import { NatsOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class SharedService implements SharedServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  connectToNATSServer(natsServerUrl: string): NatsOptions {
    const NATS_PASSWORD = this.configService.get('NATS_PASSWORD');
    const NATS_USERNAME = this.configService.get('NATS_USERNAME');
    const NATS_SERVER_URL = this.configService.get('NATS_SERVER_URL');

    console.log(NATS_SERVER_URL, '<<<<<<>>>>>>', natsServerUrl);

    return {
      transport: Transport.NATS,
      options: {
        user: NATS_USERNAME,
        pass: NATS_PASSWORD,
        servers: NATS_SERVER_URL,
        debug: true,
      },
    };
  }
}
