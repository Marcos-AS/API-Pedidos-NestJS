import { Controller, Post, Body } from '@nestjs/common';

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
