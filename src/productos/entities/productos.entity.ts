import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Fabricante } from './fabricante.entity';
import { CreateSubDocDTO } from '../dtos/sub-doc.dto';

@Schema()
export class Productos extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ type: Number, index: true })
  precio: number;

  @Prop({ type: Number })
  stock: number;

  @Prop()
  origen: string;

  @Prop()
  imagen: string;

  @Prop(
    raw({
      nombre: { type: String },
      imagen: { type: String },
    }),
  )
  categoria: Record<string, CreateSubDocDTO>;

  @Prop({ type: Types.ObjectId, ref: Fabricante.name })
  fabricante: Fabricante | Types.ObjectId;
}

export const ProductoSchema = SchemaFactory.createForClass(Productos);
