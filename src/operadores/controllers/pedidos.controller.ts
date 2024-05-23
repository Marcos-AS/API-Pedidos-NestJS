import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePedidoDTO, UpdatePedidoDTO } from '../dtos/pedido.dto';
import { PedidosService } from '../services/pedidos.service';

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private pedidosService: PedidosService) {}
  @Post()
  create(@Body() payload: CreatePedidoDTO) {
    return this.pedidosService.create(payload);
  }

  @Get()
  getPedidos() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  getPedido(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdatePedidoDTO,
  ) {
    return this.pedidosService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.delete(+id);
  }
}
