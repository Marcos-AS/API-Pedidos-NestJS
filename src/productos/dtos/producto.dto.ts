import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUrl,
  IsPositive,
  IsOptional,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { CreateCategoriaDTO } from './categorias.dto';

export class CreateProductMongoDTO {
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

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @ValidateNested() //valida DTOs embebidos
  readonly categoria: CreateCategoriaDTO;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsMongoId()
  readonly fabricante: string; //primero deben haber insertados fabricantes
}
