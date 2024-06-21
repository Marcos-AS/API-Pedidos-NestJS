import { Body, Controller, Get, Post } from '@nestjs/common';
import { OperadorService } from '../services/operador.service';
import { CreateOperadorDTO } from '../dtos/operador.dto';

@Controller('operador')
export class OperadorController {
  constructor(private operadorService: OperadorService) {}

  @Get()
  getAll() {
    return this.operadorService.findAll();
  }

  @Post()
  create(@Body() payload: CreateOperadorDTO) {
    return this.operadorService.create(payload);
  }
}
