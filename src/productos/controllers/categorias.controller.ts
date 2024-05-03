import { Controller, Post, Body } from '@nestjs/common';

@Controller('categorias')
export class CategoriasController {
  @Post()
  create(@Body() payload: any) {
    return {
      message: `Nuevo comprador!`,
      payload,
    };
  }
}
