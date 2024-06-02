import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Categorias extends Document {
  @Prop({ required: true })
  nombre: string;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categorias);
