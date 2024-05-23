import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/productos/dtos/productos.dto';
import { Producto } from 'src/productos/entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';
import { Fabricante } from '../entities/fabricante.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto) private productRepo: Repository<Producto>,
    @InjectRepository(Categoria) private categoryRepo: Repository<Categoria>,
    @InjectRepository(Fabricante) private fabRepo: Repository<Fabricante>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    const product = this.productRepo.findOne(id, {
      relations: ['fabricante', 'categorias'],
    });
    if (!product) {
      throw new NotFoundException(`El producto con id: #${id} no existe`);
    }
    return product;
  }

  async create(payload: CreateProductDTO) {
    const newProduct = this.productRepo.create(payload);
    if (payload.fabricanteId) {
      const fabricante = await this.fabRepo.findOne(payload.fabricanteId);
      newProduct.fabricante = fabricante;
    }
    if (payload.categoriasIds) {
      const categorias = await this.categoryRepo.findByIds(
        payload.categoriasIds,
      );
      newProduct.categorias = categorias;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDTO) {
    const product = await this.productRepo.findOne(id);
    if (payload.fabricanteId) {
      const fabricante = await this.fabRepo.findOne(payload.fabricanteId);
      product.fabricante = fabricante;
    }
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  delete(id: number) {
    return this.productRepo.delete(id);
  }
}
