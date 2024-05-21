import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FabricantesService } from '../services/fabricantes.service';
import { CreateFabricanteDTO } from '../dtos/fabricantes.dto';

@ApiTags('Fabricantes')
@Controller('fabricantes')
export class FabricantesController {
  constructor(private fabService: FabricantesService) {}
  @Post()
  create(@Body() payload: CreateFabricanteDTO) {
    return this.fabService.create(payload);
  }

  @Get(':nombre/productos/:productId')
  getCategory(
    @Param('productId') productId: string,
    @Param('nombre') nombre: string,
  ) {
    return `El ID del producto es ${productId} del fabricante ${nombre}`;
  }

  @Get()
  getFabricantes() {
    return this.fabService.findAll();
  }
}
