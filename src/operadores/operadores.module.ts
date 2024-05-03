import { Module } from '@nestjs/common';
import { ProductosModule } from 'src/productos/productos.module';
import { OperadoresController } from './controllers/operadores.controller';
import { CompradoresController } from './controllers/compradores.controller';
import { OperadoresService } from './services/operadores.service';
import { CompradoresService } from './services/compradores.service';

@Module({
  imports: [ProductosModule],
  controllers: [OperadoresController, CompradoresController],
  providers: [OperadoresService, CompradoresService],
})
export class OperadoresModule {}
