import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  create(@Body() product: any) {
    return { message: 'Create a new product...', data: product };
  }

  @Get()
  getAll() {
    return { message: 'Get all products...' };
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
