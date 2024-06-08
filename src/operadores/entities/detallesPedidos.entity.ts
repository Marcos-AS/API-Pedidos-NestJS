import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DetallesPedidos extends Document {
  @Prop({ type: Number })
  cantidad: number;
}
