import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDTO } from 'src/dtos/productos.dto';
import { Producto } from 'src/entities/producto.entity';

@Injectable()
export class ProductosService {
  private idCont = 1;
  private productos: Producto[] = [];

  findAll() {
    return this.productos;
  }

  findOne(id: number) {
    const product = this.productos.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`El producto con id: #${id} no existe`);
    }
    return product;
  }

  create(payload: any) {
    this.idCont = this.idCont + 1;
    const newProduct = {
      id: this.idCont,
      nombre: payload.nombre,
      descripcion: payload.descripcion,
      precio: payload.precio,
      stock: payload.stock,
      origen: payload.origen,
      imagen: payload.imagen,
    };
    this.productos.push(newProduct);
    return newProduct;
  }

  delete(id: number) {
    const index = this.productos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`El producto #${id} no se encuentra.`);
    }
    this.productos.splice(index, 1); //elimina
    return true;
  }

  update(id: number, payload: UpdateProductDTO) {
    const product = this.findOne(id);
    if (product) {
      const index = this.productos.findIndex((item) => item.id === id);
      this.productos[index] = {
        ...product, //copia las propiedades de product
        ...payload, //combina con las props. de payload, payload tiene prioridad
      };
      return this.productos[index];
    }
    return null;
  }
}
