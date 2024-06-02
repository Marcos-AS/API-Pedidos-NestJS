import { Injectable, NotFoundException } from '@nestjs/common';
import { Operador } from '../entities/operador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operador.dto';
import { CompradoresService } from './compradores.service';
import { ProductoService } from 'src/productos/services/producto.service';

@Injectable()
export class OperadoresService {
  operadores: Operador[] = [];

  constructor(
    @InjectRepository(Operador) private operatorRepo: Repository<Operador>,
    private compradorService: CompradoresService,
    private productsService: ProductoService,
  ) {}

  async findAll() {
    return await this.operatorRepo.find({
      relations: ['comprador'], //trae los compradores asociados a los operadores
    });
  }

  async findOne(id: number) {
    const operador = await this.operatorRepo.findOne({
      where: { id },
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

  async getOrderByUser(id: number) {
    const operador = await this.findOne(id);
    return {
      id,
      operador,
      products: await this.productsService.findAll(),
    };
  }
}
