import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categorias } from '../entities/categorias.entity';
import { Model } from 'mongoose';
import { CreateCategoriaDTO, UpdateCategoriaDTO } from '../dtos/categorias.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectModel(Categorias.name) private categoryModel: Model<Categorias>,
  ) {}

  findAll() {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string) {
    const categoria = await this.categoryModel.findById(id);
    if (!categoria) {
      throw new NotFoundException(`Categoría #${id} not found.`);
    }
    return categoria;
  }

  create(data: CreateCategoriaDTO) {
    const categoria = new this.categoryModel(data);
    return categoria.save();
  }

  async update(id: string, changes: UpdateCategoriaDTO) {
    const categoria = await this.categoryModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!categoria) {
      throw new NotFoundException(`Categoría #${id} not found.`);
    }
    return categoria;
  }

  delete(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  }
}
