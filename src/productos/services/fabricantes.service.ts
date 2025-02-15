import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fabricante } from '../entities/fabricante.entity';
import { Repository } from 'typeorm';
import {
  CreateFabricanteDTO,
  UpdateFabricanteDTO,
} from '../dtos/fabricantes.dto';

@Injectable()
export class FabricantesService {
  constructor(
    @InjectRepository(Fabricante)
    private fabricanteRepo: Repository<Fabricante>,
  ) {}

  async findAll() {
    return this.fabricanteRepo.find({
      relations: ['products'],
    });
    // return this.fabricanteRepo
    //   .createQueryBuilder('fabricante')
    //   .leftJoinAndSelect('fabricante.products', 'product')
    //   .select([
    //     'fabricante.id',
    //     'fabricante.nombre',
    //     'fabricante.direccion',
    //     'fabricante.email',
    //     'fabricante.imagen',
    //     'fabricante.createAt',
    //     'fabricante.updateAt',
    //     'product.id',
    //     'product.nombre',
    //   ])
    //   .getMany();
  }

  async findOne(id: number) {
    const fabricante = await this.fabricanteRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!fabricante) {
      throw new NotFoundException(`El fabricante #${id} no existe.`);
    }
    return fabricante;
  }

  create(data: CreateFabricanteDTO) {
    const newFab = this.fabricanteRepo.create(data);
    return this.fabricanteRepo.save(newFab);
  }

  async update(id: number, changes: UpdateFabricanteDTO) {
    const fabricante = await this.findOne(id);
    const newFab = this.fabricanteRepo.merge(fabricante, changes);
    return this.fabricanteRepo.save(newFab);
  }

  delete(id: number) {
    return this.fabricanteRepo.delete(id);
  }
}
