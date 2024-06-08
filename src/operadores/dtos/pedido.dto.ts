import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreatePedidoDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  readonly date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly compradorId: number;

  @IsNotEmpty()
  @IsArray()
  readonly productos: string[];
}

export class CreatePedidoMongoDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  readonly date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly comprador: string;

  @IsNotEmpty()
  @IsArray()
  readonly productos: string[];
}

export class UpdatePedidoDTO extends PartialType(
  OmitType(CreatePedidoDTO, ['productos']),
) {}

export class UpdatePedidoMongoDTO extends PartialType(
  OmitType(CreatePedidoMongoDTO, ['productos']),
) {}

export class AddProductsToOrderDTO {
  @IsNotEmpty()
  @IsArray()
  readonly productIds: string[];
}
