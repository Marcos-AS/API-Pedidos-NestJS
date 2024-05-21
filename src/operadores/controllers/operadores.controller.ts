import {
  Controller,
  Post,
  Body,
  Get,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { OperadoresService } from '../services/operadores.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateOperadorDTO } from '../dtos/operador.dto';

@ApiTags('Operadores')
@Controller('operadores')
export class OperadoresController {
  constructor(private operadoresService: OperadoresService) {}

  @Get()
  getOperators() {
    return this.operadoresService.findAll();
  }

  @Get(':id/pedidos')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.operadoresService.getOrderByUser(id);
  }

  @Post()
  create(@Body() payload: CreateOperadorDTO) {
    return this.operadoresService.create(payload);
  }
}
