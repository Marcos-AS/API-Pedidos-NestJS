import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PedidoService } from '../services/pedido.service';
import {
  AddProductsToOrderDTO,
  CreatePedidoMongoDTO,
  UpdatePedidoMongoDTO,
} from '../dtos/pedido.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@Controller('pedido')
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}
  @Post()
  create(@Body() payload: CreatePedidoMongoDTO) {
    return this.pedidoService.create(payload);
  }

  @Get()
  getPedidos() {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  getPedido(@Param('id', MongoIdPipe) id: string) {
    return this.pedidoService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdatePedidoMongoDTO,
  ) {
    return this.pedidoService.update(id, payload);
  }

  @Put(':id/productos')
  addProducts(@Param('id') id: string, @Body() payload: AddProductsToOrderDTO) {
    return this.pedidoService.addProductos(id, payload.productIds);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.pedidoService.delete(id);
  }

  @Delete(':id/producto/:productId')
  removeProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return this.pedidoService.removeProducto(id, productId);
  }
}
