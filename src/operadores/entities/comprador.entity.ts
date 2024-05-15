import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
