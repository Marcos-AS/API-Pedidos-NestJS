import { Injectable } from '@nestjs/common';
import { ProductosService } from 'src/productos/services/productos.service';
import { Pedido } from '../entities/pedido.entity';
import { Operador } from '../entities/operador.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OperadoresService {
  operadores: Operador[] = [
    {
      id: 1,
      email: 'marcossantangelo@gmail.com',
      password: '1234',
      role: 'provider',
    },
  ];

  constructor(
    private productsService: ProductosService,
    //@Inject('APIKEY') private apiKey: string,
    private configService: ConfigService,
  ) {}

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);
    return this.operadores;
  }

  findOne(id: number) {
    return this.operadores.find((x) => x.id === id);
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
