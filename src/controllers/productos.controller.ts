import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

@Controller('productos')
export class ProductosController {
  @Get('filter')
  getProductFilter() {
    return {
      message: `Soy un filter`,
    };
  }

  @Get(':idProduct')
  getProduct(@Param('idProduct') idProduct: string): string {
    return `El identificador del producto es ${idProduct}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: `Nuevo producto!`,
      payload,
    };
  }

  @Put(':idProduct')
  updateProducto(
    @Param('idProduct') idProduct: string,
    @Body() body: any,
  ): any {
    return {
      idProduct: idProduct,
      nombre: body.nombre,
      precio: body.precio,
    };
  }

  @Delete(':idProduct')
  deleteProducto(@Param('idProduct') idProduct: string): any {
    return {
      idProduct: idProduct,
      delete: true,
      count: 1,
    };
  }
}
