import { Inject, Injectable } from '@nestjs/common';
import { ProductosService } from 'src/productos/services/productos.service';
import { Operador } from '../entities/operador.entity';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(Operador) private operatorRepo: Repository<Operador>,
  ) {}

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);
    return this.operatorRepo.find();
  }

  findOne(id: number) {
    return this.operatorRepo.findOne(id);
  }

  async getOrderByUser(id: number) {
    const operador = this.findOne(id);
    return {
      date: new Date(),
      operador,
      products: await this.productsService.findAll(),
    };
  }
}
