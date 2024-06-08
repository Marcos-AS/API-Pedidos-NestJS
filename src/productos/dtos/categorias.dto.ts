import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateCategoriaDTO {
  @ApiProperty({ description: 'Nombre de la categoría' })
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly imagen: string;
}

export class UpdateCategoriaDTO extends PartialType(CreateCategoriaDTO) {}
