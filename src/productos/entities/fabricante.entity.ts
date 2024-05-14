import { PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
