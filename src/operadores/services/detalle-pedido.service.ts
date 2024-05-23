import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetallePedido } from '../entities/detallePedido.entity';
import { Repository } from 'typeorm';
import { Pedido } from '../entities/pedido.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { CreateDetallePedidoDTO } from '../dtos/detallePedido.dto';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(DetallePedido)
    private detalleRepo: Repository<DetallePedido>,
    @InjectRepository(Pedido) private pedidoRepo: Repository<Pedido>,
    @InjectRepository(Producto) private prodRepo: Repository<Producto>,
  ) {}

  async create(data: CreateDetallePedidoDTO) {
    const pedido = await this.pedidoRepo.findOne(data.pedidoId);
    const producto = await this.prodRepo.findOne(data.productoId);
    const detalle = new DetallePedido();
    detalle.pedido = pedido;
    detalle.producto = producto;
    detalle.cantidad = data.cantidad;
    return this.detalleRepo.save(detalle);
  }
}
