import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoriaDTO {
  @ApiProperty({ description: 'Nombre de la categoría' })
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;
}

export class UpdateCategoriaDTO extends PartialType(CreateCategoriaDTO) {}
