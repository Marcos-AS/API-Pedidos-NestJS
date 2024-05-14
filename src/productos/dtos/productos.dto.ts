import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUrl,
  IsPositive,
} from 'class-validator';
export class CreateProductDTO {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty({ description: 'Descripcion del producto' })
  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;

  @ApiProperty({ description: 'Precio del producto' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly precio: number;

  @ApiProperty({ description: 'Stock del producto' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @ApiProperty({ description: 'Origen geográfico del producto' })
  @IsString()
  @IsNotEmpty()
  readonly origen: string;

  @ApiProperty({ description: 'URL del producto' })
  @IsUrl()
  @IsNotEmpty()
  readonly imagen: string;
}

export class UpdateProductDTO extends PartialType(
  OmitType(CreateProductDTO, ['nombre']),
) {}
