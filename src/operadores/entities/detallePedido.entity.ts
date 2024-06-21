import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { Pedido } from '../entities/pedido.entity';

@Entity()
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @Column({ type: 'int' })
  cantidad: number;

  @ManyToOne(() => Producto)
  producto: Producto;

  @ManyToOne(() => Pedido, (pedido) => pedido.detalles)
  pedido: Pedido;
}
