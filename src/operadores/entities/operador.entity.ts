import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
