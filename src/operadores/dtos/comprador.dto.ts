import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
}

export class UpdateCompradorDTO extends PartialType(CreateCompradorDTO) {}
