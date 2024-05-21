import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Operador } from './operador.entity';
@Entity()
export class Comprador {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  nombre: string;
  @Column({ type: 'varchar' })
  apellido: string;
  @Column({ type: 'varchar' })
  telefono: string;
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
  @OneToOne(() => Operador, (operador) => operador.comprador, {
    nullable: true,
  })
  operador: Operador;
}
