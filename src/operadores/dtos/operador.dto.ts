import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOperadorDTO {
  @ApiProperty({ description: 'Email del operador' })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'Contraseña del operador' })
  @IsNotEmpty()
  @IsString()
  @Length(8)
  readonly password: string;

  @ApiProperty({ description: 'Rol del operador' })
  @IsNotEmpty()
  @IsString()
  readonly role: string;

  @ApiProperty({ description: 'ID del comprador (FK)' })
  @IsOptional() //
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly compradorId: number;
}

export class UpdateOperadorDTO extends PartialType(CreateOperadorDTO) {}
