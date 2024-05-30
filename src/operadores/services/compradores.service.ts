import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comprador } from '../entities/comprador.entity';
import { Repository } from 'typeorm';
import { CreateCompradorDTO, UpdateCompradorDTO } from '../dtos/comprador.dto';

@Injectable()
export class CompradoresService {
  constructor(
    @InjectRepository(Comprador) private compradorRepo: Repository<Comprador>,
  ) {}

  async findAll() {
    return await this.compradorRepo.find();
  }

  async findOne(id: number) {
    const comprador = await this.compradorRepo.findOneBy({ id });
    if (!comprador) {
      throw new NotFoundException(`Comprador #${id} no encontrado.`);
    }
    return comprador;
  }

  create(data: CreateCompradorDTO) {
    const newComprador = this.compradorRepo.create(data);
    return this.compradorRepo.save(newComprador);
  }

  async update(id: number, changes: UpdateCompradorDTO) {
    const comprador = await this.findOne(id);
    const updComprador = this.compradorRepo.merge(comprador, changes);
    return this.compradorRepo.save(updComprador);
  }

  delete(id: number) {
    return this.compradorRepo.delete(id);
  }
}
