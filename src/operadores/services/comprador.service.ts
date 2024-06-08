import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Compradores } from '../entities/compradores.entity';
import { Model } from 'mongoose';
import { CreateCompradorDTO, UpdateCompradorDTO } from '../dtos/comprador.dto';

@Injectable()
export class CompradorService {
  constructor(
    @InjectModel(Compradores.name) private compradorModel: Model<Compradores>,
  ) {}

  findAll() {
    return this.compradorModel.find().exec();
  }

  async findOne(id: string) {
    const comprador = await this.compradorModel.findById(id).exec();
    if (!comprador) {
      throw new NotFoundException(`El comprador con id: #${id} no existe`);
    }
    return comprador;
  }

  create(data: CreateCompradorDTO) {
    const comprador = new this.compradorModel(data);
    return comprador.save();
  }

  update(id: string, changes: UpdateCompradorDTO) {
    const comprador = this.compradorModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!comprador) {
      throw new NotFoundException(`Comprador #${id} not found.`);
    }
    return comprador;
  }

  delete(id: string) {
    return this.compradorModel.findByIdAndDelete(id);
  }
}
