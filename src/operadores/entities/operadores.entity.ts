import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

@Schema()
export class Operadores extends Document {
  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  @Exclude()
  password: string;

  @Prop({ type: String })
  role: string;

  // @Prop(
  //   raw({
  //   })
  // )
  // comprador: Record<string, any>;
}

export const OperadorSchema = SchemaFactory.createForClass(Operadores);
