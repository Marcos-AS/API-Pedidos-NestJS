import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoriaDTO } from '../dtos/categorias.dto';
import { CategoriasService } from '../services/categorias.service';

@ApiTags('Categorías')
@Controller('categorias')
export class CategoriasController {
  constructor(private categService: CategoriasService) {}
  @Post()
  create(@Body() payload: CreateCategoriaDTO) {
    return this.categService.create(payload);
  }

  @Get()
  getCategorias() {
    return this.categService.findAll();
  }
}
