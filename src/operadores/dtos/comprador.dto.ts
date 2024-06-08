import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompradorDTO {
  @ApiProperty({ description: 'Nombre del comprador' })
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @ApiProperty({ description: 'Apellido del comprador' })
  @IsNotEmpty()
  @IsString()
  readonly apellido: string;

  @ApiProperty({ description: 'Teléfono del comprador' })
  @IsNotEmpty()
  @IsString()
  readonly telefono: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly direcciones: any;
}

export class UpdateCompradorDTO extends PartialType(CreateCompradorDTO) {}
