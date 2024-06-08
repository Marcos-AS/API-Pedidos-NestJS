import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Compradores extends Document {
  @Prop()
  nombre: string;

  @Prop()
  apellido: string;

  @Prop()
  telefono: string;

  @Prop({
    type: [
      {
        ciudad: { type: String },
        calle: { type: String },
        numero: { type: String },
      },
    ],
  })
  direcciones: Types.Array<Record<string, any>>;
}

export const CompradorSchema = SchemaFactory.createForClass(Compradores);
