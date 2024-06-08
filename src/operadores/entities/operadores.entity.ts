import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Operadores extends Document {
  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  role: string;
}

export const OperadorSchema = SchemaFactory.createForClass(Operadores);
