import {} from '@nestjs/microservices';

export interface SharedServiceInterface {
  connectToNATSServer(natsServerUrl: string): void;
}
