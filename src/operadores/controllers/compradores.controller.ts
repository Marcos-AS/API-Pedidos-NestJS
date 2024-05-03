import { Controller, Post, Body } from '@nestjs/common';

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
