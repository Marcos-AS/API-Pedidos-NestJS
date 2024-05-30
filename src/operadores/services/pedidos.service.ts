import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from '../entities/pedido.entity';
import { Repository } from 'typeorm';
import { Comprador } from '../entities/comprador.entity';
import { CreatePedidoDTO, UpdatePedidoDTO } from '../dtos/pedido.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido) private pedidoRepo: Repository<Pedido>,
    @InjectRepository(Comprador) private compradorRepo: Repository<Comprador>,
  ) {}

  findAll() {
    return this.pedidoRepo.find();
  }

  async findOne(id: number) {
    const pedido = await this.pedidoRepo.findOneBy({ id });
    if (!pedido) {
      throw new NotFoundException(`El pedido #${id} no existe.`);
    }
    return pedido;
  }

  async create(data: CreatePedidoDTO) {
    //const pedido = this.pedidoRepo.create(data);
    const pedido = new Pedido();
    if (data.compradorId) {
      const customer = await this.compradorRepo.findOneBy({
        id: data.compradorId,
      });
      pedido.comprador = customer;
    }
    return this.pedidoRepo.save(pedido);
  }

  async update(id: number, changes: UpdatePedidoDTO) {
    const pedido = await this.pedidoRepo.findOneBy({ id });
    if (changes.compradorId) {
      const customer = await this.compradorRepo.findOneBy({
        id: changes.compradorId,
      });
      pedido.comprador = customer;
    }
    return this.pedidoRepo.save(pedido);
  }

  delete(id: number) {
    return this.pedidoRepo.delete(id);
  }
}
