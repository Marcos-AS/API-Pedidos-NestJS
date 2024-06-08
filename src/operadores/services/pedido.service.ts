import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pedidos } from '../entities/pedidos.entity';
import { Model } from 'mongoose';
import { CreatePedidoMongoDTO, UpdatePedidoMongoDTO } from '../dtos/pedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectModel(Pedidos.name) private pedidosModel: Model<Pedidos>,
  ) {}

  findAll() {
    return this.pedidosModel
      .find()
      .populate('comprador')
      .populate({
        path: 'productos',
        model: 'Productos',
      })
      .exec();
  }

  async findOne(id: string) {
    const pedido = await this.pedidosModel.findById(id);
    if (!pedido) {
      throw new NotFoundException(`Pedido #${id} not found.`);
    }
    return pedido;
  }

  create(data: CreatePedidoMongoDTO) {
    const pedido = new this.pedidosModel(data);
    return pedido.save();
  }

  async update(id: string, changes: UpdatePedidoMongoDTO) {
    const pedido = await this.pedidosModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!pedido) {
      throw new NotFoundException(`Pedido #${id} not found.`);
    }
    return pedido;
  }

  delete(id: string) {
    return this.pedidosModel.findByIdAndDelete(id);
  }

  async removeProducto(id: string, productId: string) {
    const pedido = await this.pedidosModel.findById(id);
    pedido.productos.pull(productId);
    return pedido.save();
  }

  async addProductos(id: string, productIds: string[]) {
    const pedido = await this.pedidosModel.findById(id);
    productIds.forEach((pId) => pedido.productos.push(pId));
    return pedido.save();
  }
}
