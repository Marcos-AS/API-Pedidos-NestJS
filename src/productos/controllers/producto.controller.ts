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
  UseGuards,
} from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from '../../auth/models/roles.model';
import { MongoIdPipe } from '../../common/mongo-id.pipe';
import {
  CreateProductDTO,
  FilterProductsDTO,
  UpdateProductDTO,
} from '../dtos/productos.dto';
import { ProductoService } from '../services/producto.service';

@ApiTags('Productos')
//@UseGuards(AuthGuard('jwt'))
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('producto') //mongo
export class ProductoController {
  constructor(private productsService: ProductoService) {}

  @ApiOperation({ summary: 'Obtener lista de productos' })
  @Public()
  @Get()
  getProducts(@Query() params: FilterProductsDTO) {
    return this.productsService.findAll(params);
  }

  @Public()
  @Get(':idProduct')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('idProduct', MongoIdPipe) idProduct: string) {
    return this.productsService.findOne(idProduct);
  }

  @Roles(Role.ADMIN)
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
