import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;
}
