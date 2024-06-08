import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Fabricantes } from '../entities/fabricantes.entity';
import { Model } from 'mongoose';
import { CreateFabricanteDTO } from '../dtos/fabricantes.dto';
import { UpdateCategoriaDTO } from '../dtos/categorias.dto';

@Injectable()
export class FabricanteService {
  constructor(
    @InjectModel(Fabricantes.name) private fabricanteModel: Model<Fabricantes>,
  ) {}

  findAll() {
    return this.fabricanteModel.find().exec();
  }

  async findOne(id: string) {
    const fabricante = await this.fabricanteModel.findById(id);
    if (!fabricante) {
      throw new NotFoundException(`Fabricante #${id} not found.`);
    }
    return fabricante;
  }

  create(data: CreateFabricanteDTO) {
    const fabricante = new this.fabricanteModel(data);
    return fabricante.save();
  }

  async update(id: string, changes: UpdateCategoriaDTO) {
    const fabricante = await this.fabricanteModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!fabricante) {
      throw new NotFoundException(`Fabricante #${id} not found.`);
    }
    return fabricante;
  }

  delete(id: string) {
    return this.fabricanteModel.findByIdAndDelete(id);
  }
}
