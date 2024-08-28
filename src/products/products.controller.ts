import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
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
  getAll(@Query() paginationDto: PaginationDto) {
    return this.productClient.send({ cmd: 'getAll' }, paginationDto);
  }

  @Get(':id')
  async getbyId(@Param('id', ParseIntPipe) id: number) {
    // * FORMA 1 DE MANEJAR LAS EXCEPCIONES
    return this.productClient.send({ cmd: 'getById' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );

    // * FORMA 2 DE MANEJAR LAS EXCEPCIONES
    // try {
    //   // * Manejando el Observable que se retorna al hacer el .send
    //   const product = await firstValueFrom(
    //     this.productClient.send({ cmd: 'getById' }, { id }),
    //   );
    //   return product;
    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() product: any) {
    return { message: `Update product #${id}...`, data: product };
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return { message: `Delete product #${id}...` };
  }
}
