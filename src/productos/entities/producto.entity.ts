import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;
  @Column({ type: 'text' })
  descripcion: string;
  @Column({ type: 'int' })
  precio: number;
  @Column({ type: 'int' })
  stock: number;
  @Column({ type: 'varchar' })
  origen: string;
  @Column({ type: 'varchar' })
  imagen: string;
  @CreateDateColumn({
    // type: 'timestamptz', //postgres
    type: 'timestamp', //mysql
    //default: () => 'CURRENT_TIMESTAMP', //postgres
  })
  createAt: Date;
  @UpdateDateColumn({
    //type: 'timestamptz', //no funciona para mysql
    type: 'timestamp', //mysql
    //default: () => 'CURRENT_TIMESTAMP', //no funciona para mysql
  })
  updateAt: Date;
}
