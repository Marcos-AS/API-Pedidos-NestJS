import { Column } from 'typeorm';
import { Operador } from './operador.entity';
import { Producto } from 'src/productos/entities/producto.entity';

export class Pedido {
  @Column({ type: 'date' })
  date: Date;
  @Column({ type: 'json' })
  operador: Operador;
  @Column({ type: 'json' })
  products: Producto[];
}
