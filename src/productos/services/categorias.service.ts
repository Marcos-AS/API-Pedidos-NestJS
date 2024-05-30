import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from '../entities/categoria.entity';
import { Repository } from 'typeorm';
import { CreateCategoriaDTO, UpdateCategoriaDTO } from '../dtos/categorias.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria) private categoryRepo: Repository<Categoria>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Categoría #${id} no existe.`);
    }
    return category;
  }

  create(data: CreateCategoriaDTO) {
    const newCategory = this.categoryRepo.create(data);
    return this.categoryRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoriaDTO) {
    const category = await this.findOne(id);
    this.categoryRepo.merge(category, changes);
    return this.categoryRepo.save(category);
  }

  delete(id: number) {
    return this.categoryRepo.delete(id);
  }
}
