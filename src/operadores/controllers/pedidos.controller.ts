import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {
  @Post()
  create(@Body() payload: any) {
    return {
      message: `Nuevo pedido!`,
      payload,
    };
  }
}
