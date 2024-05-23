import { Body, Controller, Post } from '@nestjs/common';
import { DetallePedidoService } from '../services/detalle-pedido.service';
import { CreateDetallePedidoDTO } from '../dtos/detallePedido.dto';

@Controller('detalle-pedido')
export class DetallePedidoController {
  constructor(private detalleService: DetallePedidoService) {}

  @Post()
  create(@Body() payload: CreateDetallePedidoDTO) {
    return this.detalleService.create(payload);
  }
}
