import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SharedService } from '../services/shared.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../../../.env.development',
    }),
  ],
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {
  static registerNATSClientModule(): DynamicModule {
    const providers = [
      {
        provide: 'NATS_CLIENT',
        useFactory: (configService: ConfigService) => {
          const NATS_PASSWORD = configService.get('NATS_PASSWORD');
          const NATS_USERNAME = configService.get('NATS_USERNAME');
          const NATS_SERVER_URL = configService.get('NATS_SERVER_URL');

          return ClientProxyFactory.create({
            transport: Transport.NATS,
            options: {
              user: NATS_USERNAME,
              pass: NATS_PASSWORD,
              servers: NATS_SERVER_URL,
              debug: true,
            },
          });
        },
        inject: [ConfigService],
      },
    ];
    return {
      module: SharedModule,
      providers,
      exports: providers,
    };
  }
}
