import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types } from 'mongoose';
import { Productos } from 'src/productos/entities/productos.entity';
import { Compradores } from './compradores.entity';

@Schema()
export class Pedidos extends Document {
  @Prop({ type: Date })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: Compradores.name, required: true })
  comprador: Compradores | Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: Productos.name }] })
  productos: Types.Array<Productos>;
}

export const PedidoSchema = SchemaFactory.createForClass(Pedidos);
