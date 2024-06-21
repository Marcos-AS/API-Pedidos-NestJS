import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comprador } from './comprador.entity';

@Entity()
export class Operador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  role: string;

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

  @OneToOne(() => Comprador, (comprador) => comprador.operador, {
    nullable: true,
  })
  @JoinColumn()
  comprador: Comprador;
}
