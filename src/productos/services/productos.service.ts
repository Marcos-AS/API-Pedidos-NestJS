import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/productos/dtos/productos.dto';
import { Producto } from 'src/productos/entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { ConfigService } from '@nestjs/config';

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
    const product = this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`El producto con id: #${id} no existe`);
    }
    return product;
  }

  create(payload: CreateProductDTO) {
    // this.idCont = this.idCont + 1;
    // const newProduct = {
    //   id: this.idCont,
    //   nombre: payload.nombre,
    //   descripcion: payload.descripcion,
    //   precio: payload.precio,
    //   stock: payload.stock,
    //   origen: payload.origen,
    //   imagen: payload.imagen,
    // };
    const newProduct = this.productRepo.create(payload);
    //this.productos.push(newProduct);
    return this.productRepo.save(newProduct);
  }

  delete(id: number) {
    // const index = this.productos.findIndex((item) => item.id === id);
    // if (index === -1) {
    //   throw new NotFoundException(`El producto #${id} no se encuentra.`);
    // }
    // this.productos.splice(index, 1); //elimina
    // return true;
    return this.productRepo.delete(id);
  }

  async update(id: number, payload: UpdateProductDTO) {
    //const product = this.findOne(id);
    const product = await this.productRepo.findOneBy({ id });
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
    // if (product) {
    //   const index = this.productos.findIndex((item) => item.id === id);
    //   this.productos[index] = {
    //     ...product, //copia las propiedades de product
    //     ...payload, //combina con las props. de payload, payload tiene prioridad
    //   };
    //   return this.productos[index];
    // }
    // return null;
  }
}
