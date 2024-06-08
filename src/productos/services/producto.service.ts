import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDTO,
  FilterProductsDTO,
  UpdateProductDTO,
} from 'src/productos/dtos/productos.dto';
import { Productos } from 'src/productos/entities/productos.entity';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel(Productos.name) private productModel: Model<Productos>,
  ) {}

  findAll(params?: FilterProductsDTO) {
    if (params) {
      const filters: FilterQuery<Productos> = {};
      const { limit, offset } = params;
      const { precioMinimo, precioMaximo } = params;
      if (precioMinimo && precioMaximo) {
        filters.precio = { $gte: precioMinimo, $lte: precioMaximo };
      }
      return this.productModel
        .find(filters)
        .populate('fabricante') //trae todos los atributos de esta entidad, no solo el ID que esta en producto
        .skip(offset)
        .limit(limit)
        .exec();
    }
    return this.productModel.find().populate('fabricante').exec();
  }

  async findOne(id: number) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`El producto con id: #${id} no existe`);
    }
    return product;
  }

  async create(data: CreateProductDTO) {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  async update(id: string, changes: UpdateProductDTO) {
    const product = this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found.`);
    }
    return product;
  }

  delete(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
