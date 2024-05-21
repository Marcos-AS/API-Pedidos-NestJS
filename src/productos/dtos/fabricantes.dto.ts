import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateFabricanteDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly direccion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  readonly imagen: string;
}

export class UpdateFabricanteDTO extends PartialType(CreateFabricanteDTO) {}
