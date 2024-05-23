import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateDetallePedidoDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  cantidad: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  productoId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  pedidoId: number;
}

export class UpdateDetallePedidoDTO extends PartialType(
  CreateDetallePedidoDTO,
) {}
