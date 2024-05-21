import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductosService } from 'src/productos/services/productos.service';
import { Operador } from '../entities/operador.entity';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operador.dto';
import { Pedido } from '../entities/pedido.entity';
import { CompradoresService } from './compradores.service';

@Injectable()
export class OperadoresService {
  operadores: Operador[] = [];

  constructor(
    private productsService: ProductosService,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(Operador) private operatorRepo: Repository<Operador>,
    private compradorService: CompradoresService,
  ) {}

  async findAll() {
    return await this.operatorRepo.find({
      relations: ['comprador'], //trae los compradores asociados a los operadores
    });
  }

  async findOne(id: number) {
    const operador = await this.operatorRepo.findOne(id, {
      relations: ['comprador'],
    });
    if (!operador) {
      throw new NotFoundException(`Operador #${id} no encontrado.`);
    }
    return operador;
  }

  async create(data: CreateOperadorDTO) {
    const newOperador = this.operatorRepo.create(data);
    if (data.compradorId) {
      const comprador = await this.compradorService.findOne(data.compradorId);
      newOperador.comprador = comprador;
    }
    return await this.operatorRepo.save(newOperador);
  }

  async update(id: number, changes: UpdateOperadorDTO) {
    const operador = await this.findOne(id);
    const updOperador = this.operatorRepo.merge(operador, changes);
    return this.operatorRepo.save(updOperador);
  }

  delete(id: number) {
    return this.operatorRepo.delete(id);
  }

  async getOrderByUser(id: number): Promise<Pedido> {
    const operador = await this.findOne(id);
    return {
      id,
      date: new Date(),
      operador,
      products: await this.productsService.findAll(),
    };
  }
}
