import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Operadores } from '../entities/operadores.entity';
import { Model } from 'mongoose';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operador.dto';

@Injectable()
export class OperadorService {
  constructor(
    @InjectModel(Operadores.name) private operadorModel: Model<Operadores>,
  ) {}

  findAll() {
    return this.operadorModel.find().exec();
  }

  async findOne(id: string) {
    const operador = await this.operadorModel.findById(id);
    if (!operador) {
      throw new NotFoundException(`Operador #${id} not found.`);
    }
    return operador;
  }

  create(data: CreateOperadorDTO) {
    const operador = new this.operadorModel(data);
    return operador.save();
  }

  async update(id: string, changes: UpdateOperadorDTO) {
    const operador = await this.operadorModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!operador) {
      throw new NotFoundException(`Operador #${id} not found.`);
    }
    return operador;
  }

  delete(id: string) {
    return this.operadorModel.findByIdAndDelete(id);
  }
}
