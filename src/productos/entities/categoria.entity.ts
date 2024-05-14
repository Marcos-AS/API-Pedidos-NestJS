import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;
}
