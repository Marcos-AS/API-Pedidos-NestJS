import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Producto } from './producto.entity';

@Entity()
export class Fabricante {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;
  @Column({ type: 'varchar' })
  direccion: string;
  @Column({ type: 'varchar' })
  email: string;
  @Column({ type: 'varchar' })
  imagen: string;
  @CreateDateColumn({
    type: 'timestamptz', //postgres
    // type: 'timestamp', //mysql
    default: () => 'CURRENT_TIMESTAMP', //postgres
  })
  createAt: Date;
  @UpdateDateColumn({
    type: 'timestamptz', //no funciona para mysql
    // type: 'timestamp', //mysql
    default: () => 'CURRENT_TIMESTAMP', //no funciona para mysql
  })
  updateAt: Date;
  @OneToMany(() => Producto, (product) => product.fabricante)
  products: Producto[];
}
