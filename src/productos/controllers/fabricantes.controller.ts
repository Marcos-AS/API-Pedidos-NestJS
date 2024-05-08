import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Fabricantes')
@Controller('fabricantes')
export class FabricantesController {
  @Post()
  create(@Body() payload: any) {
    return {
      message: `Nuevo fabricante!`,
      payload,
    };
  }

  @Get(':nombre/productos/:productId')
  getCategory(
    @Param('productId') productId: string,
    @Param('nombre') nombre: string,
  ) {
    return `El ID del producto es ${productId} del fabricante ${nombre}`;
  }

  @Get()
  getProducts(
    @Query('id') id = 1,
    @Query('nombre') nombre = 'ACME',
    @Query('origen') origen: string,
  ) {
    return `El fabricante con ID: ${id}, y nombre => ${nombre}. Su procedencia es ${origen}`;
  }
}
