import { Injectable } from '@nestjs/common';
import { ProductosService } from 'src/productos/services/productos.service';
import { Pedido } from '../entities/pedido.entity';

@Injectable()
export class OperadoresService {
  constructor(private productsService: ProductosService) {}

  //cambiar
  findOne(id: number) {
    return {
      id: id,
      email: 'marcossantangelo@gmail.com',
      password: '1234',
      role: 'provider',
    };
  }

  getOrderByUser(id: number): Pedido {
    const operador = this.findOne(id);
    return {
      date: new Date(),
      operador,
      products: this.productsService.findAll(),
    };
  }
}
