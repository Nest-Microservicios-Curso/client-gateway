import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

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
  findOne(@Param('id') id: string) {
    return this.ordersClient.send({ cmd: 'getById' }, { id });
  }

  @Put(':id')
  setStatus(@Param('id') id: string) {
    return this.ordersClient.send({ cmd: 'setStatus' }, { id });
  }
}
