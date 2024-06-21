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
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/productos.dto';
import { ProductosService } from '../services/productos.service';

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
    @Param('idProduct', ParseIntPipe) idProduct: string,
    @Body() payload: UpdateProductDTO,
  ) {
    return this.productsService.update(+idProduct, payload);
  }

  @Delete(':idProduct')
  deleteProducto(@Param('idProduct', ParseIntPipe) idProduct: string) {
    return this.productsService.delete(+idProduct);
  }

  @Put(':id/category/:categoryId')
  addCategoryToProduct(
    @Param('id') id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.addCategoryToProduct(id, categoryId);
  }

  @Patch(':id/category/:categoryId')
  removeCategoryFromProduct(
    @Param('id') id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.removeCategoryFromProduct(id, categoryId);
  }
}
