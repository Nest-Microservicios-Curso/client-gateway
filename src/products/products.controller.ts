import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCTS_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() product: any) {
    return { message: 'Create a new product...', data: product };
  }

  @Get()
  getAll() {
    return this.productClient.send({ cmd: 'getAll' }, {});
  }

  @Get(':id')
  getbyId() {
    return { message: 'Get a product by id...' };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() product: any) {
    return { message: `Update product #${id}...`, data: product };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return { message: `Delete product #${id}...` };
  }
}
