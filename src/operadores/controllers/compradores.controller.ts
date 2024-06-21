import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompradoresService } from '../services/compradores.service';
import { CreateCompradorDTO, UpdateCompradorDTO } from '../dtos/comprador.dto';
import { ParseIntPipe } from '../../common/parse-int.pipe';

@ApiTags('Compradores')
@Controller('compradores')
export class CompradoresController {
  constructor(private compradoresService: CompradoresService) {}

  @Post()
  create(@Body() payload: CreateCompradorDTO) {
    return this.compradoresService.create(payload);
  }

  @Get()
  getAll() {
    return this.compradoresService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.compradoresService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCompradorDTO,
  ) {
    return this.compradoresService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.compradoresService.delete(id);
  }
}
