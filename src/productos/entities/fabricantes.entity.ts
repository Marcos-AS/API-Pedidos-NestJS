import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Fabricantes extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  direccion: string;

  @Prop()
  email: string;

  @Prop()
  imagen: string;
}

export const FabricanteSchema = SchemaFactory.createForClass(Fabricantes);
