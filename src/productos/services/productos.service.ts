import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/productos/dtos/productos.dto';
import { Producto } from '../entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

  async findOne(id: number) {
    const product = this.productRepo.findOne({
      where: { id },
      relations: ['fabricante', 'categorias'],
    });
    if (!product) {
      throw new NotFoundException(`El producto con id: #${id} no existe`);
    }
    return product;
  }

  async create(data: CreateProductDTO) {
    const newProduct = this.productRepo.create(data);
    if (data.fabricanteId) {
      const fabricante = await this.fabRepo.findOneBy({
        id: data.fabricanteId,
      });
      newProduct.fabricante = fabricante;
    }
    if (data.categoriasIds) {
      const categorias = await this.categoryRepo.findBy({
        id: In(data.categoriasIds),
      });
      newProduct.categorias = categorias;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDTO) {
    const product = await this.productRepo.findOneBy({ id });
    if (changes.fabricanteId) {
      const fabricante = await this.fabRepo.findOneBy({
        id: changes.fabricanteId,
      });
      product.fabricante = fabricante;
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  delete(id: number) {
    return this.productRepo.delete(id);
  }

  async removeCategoryFromProduct(prodId: number, categId: number) {
    const producto = await this.productRepo.findOne({
      where: { id: prodId },
      relations: ['categorias'],
    });
    producto.categorias = producto.categorias.filter(
      (item) => item.id !== categId, //deja en el array de categorias las distintas al id argumento
    );
    return this.productRepo.save(producto);
  }

  async addCategoryToProduct(prodId: number, categId: number) {
    const producto = await this.productRepo.findOne({
      where: { id: prodId },
      relations: ['categorias'],
    });
    const categoria = await this.categoryRepo.findOneBy({ id: categId });
    producto.categorias.push(categoria);
    return this.productRepo.save(producto);
  }
}
