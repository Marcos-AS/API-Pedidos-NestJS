/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Operadores } from '../entities/operadores.entity';
import { Model } from 'mongoose';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operador.dto';
import * as bcrypt from 'bcrypt';

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

  async create(data: CreateOperadorDTO): Promise<Partial<Operadores>> {
    const operador = new this.operadorModel(data);
    const hashPassword = await bcrypt.hash(operador.password, 10);
    operador.password = hashPassword;
    const model = await operador.save();
    const { password, ...rta } = model.toJSON();
    return rta;
  }

  findByEmail(email: string) {
    return this.operadorModel.findOne({ email }).exec();
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
