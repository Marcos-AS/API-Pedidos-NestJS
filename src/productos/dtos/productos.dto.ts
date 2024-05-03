import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUrl,
  IsPositive,
} from 'class-validator';
export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly precio: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @IsString()
  @IsNotEmpty()
  readonly origen: string;

  @IsUrl()
  @IsNotEmpty()
  readonly imagen: string;
}

export class UpdateProductDTO extends PartialType(
  OmitType(CreateProductDTO, ['nombre']),
) {}
