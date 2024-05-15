import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/productos/dtos/productos.dto';
import { Producto } from 'src/productos/entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  private idCont = 1;
  private productos: Producto[] = [];
  constructor(
    @InjectRepository(Producto) private productRepo: Repository<Producto>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    const product = this.productRepo.findOne({ id });
    if (!product) {
      throw new NotFoundException(`El producto con id: #${id} no existe`);
    }
    return product;
  }

  create(payload: CreateProductDTO) {
    const newProduct = this.productRepo.create(payload);
    return this.productRepo.save(newProduct);
  }

  delete(id: number) {
    return this.productRepo.delete(id);
  }

  async update(id: number, payload: UpdateProductDTO) {
    const product = await this.productRepo.findOne({ id });
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }
}
