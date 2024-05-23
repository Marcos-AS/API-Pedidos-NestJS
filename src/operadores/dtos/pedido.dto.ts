import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreatePedidoDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly compradorId: number;
}

export class UpdatePedidoDTO extends PartialType(CreatePedidoDTO) {}
