import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVER } from 'src/config';

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
  controllers: [ProductsController],
})
export class ProductsModule {}
