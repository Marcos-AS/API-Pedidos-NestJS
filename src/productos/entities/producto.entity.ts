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
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
