import { Controller, Post, Body } from '@nestjs/common';

@Controller('operadores')
export class OperadoresController {
  @Post()
  create(@Body() payload: any) {
    return {
      message: `Nuevo operador!`,
      payload,
    };
  }
}
