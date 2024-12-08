import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVER, envs } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NATS_SERVER,
        transport: Transport.NATS,
        options: {
          servers: envs.NATS_SERVER,
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: NATS_SERVER,
        transport: Transport.NATS,
        options: {
          servers: envs.NATS_SERVER,
        },
      },
    ]),
  ],
})
export class NatsModule {}
