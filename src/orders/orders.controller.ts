import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { ORDERS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import {
  CreateOrderDto,
  OrdersPaginationDto,
  UpdateOrderStatusDto,
} from './dto';

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
  findAll(@Query() ordersPaginationDto: OrdersPaginationDto) {
    return this.ordersClient.send({ cmd: 'getAll' }, ordersPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send({ cmd: 'getById' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch()
  setStatus(@Body() updateOrderStatus: UpdateOrderStatusDto) {
    return this.ordersClient.send({ cmd: 'setStatus' }, updateOrderStatus).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
