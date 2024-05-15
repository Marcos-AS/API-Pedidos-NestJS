import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Operador } from './operador.entity';
import { Producto } from 'src/productos/entities/producto.entity';
@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'date' })
  date: Date;
  @Column({ type: 'json' })
  operador: Operador;
  @Column({ type: 'json' })
  products: Producto[];
}
