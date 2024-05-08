import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Compradores')
@Controller('compradores')
export class CompradoresController {
  @Post()
  create(@Body() payload: any) {
    return {
      message: `Nuevo comprador!`,
      payload,
    };
  }
}
