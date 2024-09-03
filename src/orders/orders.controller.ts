import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Put,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send({ cmd: 'create_order' }, createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersClient.send({ cmd: 'getAll' }, {});
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send({ cmd: 'getById' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Put(':id')
  setStatus(@Param('id') id: string) {
    return this.ordersClient.send({ cmd: 'setStatus' }, { id });
  }
}
