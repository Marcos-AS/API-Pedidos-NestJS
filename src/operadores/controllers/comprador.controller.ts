import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { CompradorService } from '../services/comprador.service';
import { CreateCompradorDTO, UpdateCompradorDTO } from '../dtos/comprador.dto';
import { MongoIdPipe } from '../../common/mongo-id.pipe';

@Controller('comprador')
export class CompradorController {
  constructor(private compradoresService: CompradorService) {}

  @Post()
  create(@Body() payload: CreateCompradorDTO) {
    return this.compradoresService.create(payload);
  }

  @Get()
  getAll() {
    return this.compradoresService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.compradoresService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateCompradorDTO,
  ) {
    return this.compradoresService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.compradoresService.delete(id);
  }
}
