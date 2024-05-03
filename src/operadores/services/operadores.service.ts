import { Injectable } from '@nestjs/common';
import { ProductosService } from 'src/productos/services/productos.service';
import { Pedido } from '../entities/pedido.entity';
import { Operador } from '../entities/operador.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OperadoresService {
  operadores: Operador[];

  constructor(
    private productsService: ProductosService,
    private configService: ConfigService,
  ) {}

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);
    return this.operadores;
  }

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
