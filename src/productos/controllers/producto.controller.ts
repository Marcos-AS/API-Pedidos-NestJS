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
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import {
  CreateProductDTO,
  FilterProductsDTO,
  UpdateProductDTO,
} from 'src/productos/dtos/productos.dto';
import { ProductoService } from 'src/productos/services/producto.service';

@ApiTags('Productos')
@Controller('producto') //mongo
export class ProductoController {
  constructor(private productsService: ProductoService) {}

  @ApiOperation({ summary: 'Obtener lista de productos' })
  @Get()
  getProducts(@Query() params: FilterProductsDTO) {
    return this.productsService.findAll(params);
  }

  @Get('filter')
  getProductFilter() {
    return {
      message: `Soy un filter`,
    };
  }

  @Get(':idProduct')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('idProduct', MongoIdPipe) idProduct: string) {
    return this.productsService.findOne(+idProduct);
  }

  @Post()
  create(@Body() payload: CreateProductDTO) {
    return this.productsService.create(payload);
  }

  @Put(':idProduct')
  update(
    @Param('idProduct', MongoIdPipe) idProduct: string,
    @Body() payload: UpdateProductDTO,
  ) {
    return this.productsService.update(idProduct, payload);
  }

  @Delete(':idProduct')
  deleteProducto(@Param('idProduct', MongoIdPipe) idProduct: string) {
    return this.productsService.delete(idProduct);
  }

  //@Put(':id/category/:categoryId')
  //addCategoryToProduct(
  //@Param('id') id: number,
  //@Param('categoryId', ParseIntPipe) categoryId: number,
  //) {
  //return this.productsService.addCategoryToProduct(id, categoryId);
  //}

  //@Patch(':id/category/:categoryId')
  //removeCategoryFromProduct(
  //@Param('id') id: number,
  //@Param('categoryId', ParseIntPipe) categoryId: number,
  // ) {
  //     // return this.productsService.removeCategoryFromProduct(id, categoryId);
  // }
}
