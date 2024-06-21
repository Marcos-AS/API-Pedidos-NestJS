import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Comprador } from './comprador.entity';
import { DetallePedido } from '../entities/detallePedido.entity';
@Entity()
export class Pedido {
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

  @ManyToOne(() => Comprador, (comprador) => comprador.pedidos)
  comprador: Comprador;

  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido)
  detalles: DetallePedido[];
}
