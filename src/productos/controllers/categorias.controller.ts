import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categorías')
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
