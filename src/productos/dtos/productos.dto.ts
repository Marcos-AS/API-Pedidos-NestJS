import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUrl,
  IsPositive,
  IsArray,
} from 'class-validator';
export class CreateProductDTO {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @ApiProperty({ description: 'Descripcion del producto' })
  @IsNotEmpty()
  @IsString()
  readonly descripcion: string;

  @ApiProperty({ description: 'Precio del producto' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly precio: number;

  @ApiProperty({ description: 'Stock del producto' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @ApiProperty({ description: 'Origen geográfico del producto' })
  @IsNotEmpty()
  @IsString()
  readonly origen: string;

  @ApiProperty({ description: 'URL del producto' })
  @IsNotEmpty()
  @IsUrl()
  readonly imagen: string;

  @ApiProperty({ description: 'ID del fabricante (FK)' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly fabricanteId: number;

  @ApiProperty({ description: 'IDs de las categorías' })
  @IsNotEmpty()
  @IsArray()
  readonly categoriasIds: number[];
}

export class UpdateProductDTO extends PartialType(
  OmitType(CreateProductDTO, ['nombre']),
) {}
