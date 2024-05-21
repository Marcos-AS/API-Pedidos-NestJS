import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompradoresService } from '../services/compradores.service';
import { CreateCompradorDTO } from '../dtos/comprador.dto';

@ApiTags('Compradores')
@Controller('compradores')
export class CompradoresController {
  constructor(private compradorService: CompradoresService) {}

  @Post()
  create(@Body() payload: CreateCompradorDTO) {
    return this.compradorService.create(payload);
  }

  @Get()
  getCompradores() {
    return this.compradorService.findAll();
  }
}
