import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVER } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NATS_SERVER,
        transport: Transport.NATS,
        options: {
          server: envs.NATS_SERVER,
        },
      },
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
