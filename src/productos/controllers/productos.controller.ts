/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/productos/dtos/productos.dto';
import { ProductosService } from 'src/productos/services/productos.service';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private productsService: ProductosService) {}

  @ApiOperation({ summary: 'Obtener lista de productos' })
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand = '',
  ) {
    return this.productsService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return {
      message: `Soy un filter`,
    };
  }

  @Get(':idProduct')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('idProduct', ParseIntPipe) idProduct: string) {
    return this.productsService.findOne(+idProduct);
  }

  @Post()
  create(@Body() payload: CreateProductDTO) {
    return this.productsService.create(payload);
  }

  @Put(':idProduct')
  update(
    @Param('idProduct') idProduct: string,
    @Body() payload: UpdateProductDTO,
  ) {
    return this.productsService.update(+idProduct, payload);
  }

  @Delete(':idProduct')
  deleteProducto(@Param('idProduct') idProduct: string): any {
    return this.productsService.delete(+idProduct);
  }
}
