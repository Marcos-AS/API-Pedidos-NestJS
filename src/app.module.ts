import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FabricantesController } from './controllers/fabricantes.controller';
import { ProductosController } from './controllers/productos.controller';
import { PedidosController } from './controllers/pedidos.controller';
import { OperadoresController } from './controllers/operadores.controller';
import { CategoriasController } from './controllers/categorias.controller';
import { CompradoresController } from './controllers/compradores.controller';
import { ProductosService } from './services/productos.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    FabricantesController,
    ProductosController,
    PedidosController,
    OperadoresController,
    CategoriasController,
    CompradoresController,
  ],
  providers: [AppService, ProductosService], //implementacion de los servicios
})
export class AppModule {}
