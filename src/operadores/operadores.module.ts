import { Module } from '@nestjs/common';
import { ProductosModule } from 'src/productos/productos.module';
import { OperadoresController } from './controllers/operadores.controller';
import { CompradoresController } from './controllers/compradores.controller';
import { OperadoresService } from './services/operadores.service';
import { CompradoresService } from './services/compradores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operador } from './entities/operador.entity';
import { Comprador } from './entities/comprador.entity';
import { Pedido } from './entities/pedido.entity';
import { DetallePedido } from 'src/operadores/entities/detallePedido.entity';
import { PedidosService } from './services/pedidos.service';
import { DetallePedidoService } from './services/detalle-pedido.service';
import { DetallePedidoController } from './controllers/detalle-pedido.controller';
import { Producto } from 'src/productos/entities/producto.entity';
import { PedidosController } from './controllers/pedidos.controller';
import { CompradorService } from './services/comprador.service';
import { PedidoService } from './services/pedido.service';
import { OperadorService } from './services/operador.service';
import { CompradorController } from './controllers/comprador.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Compradores, CompradorSchema } from './entities/compradores.entity';
import { Pedidos, PedidoSchema } from './entities/pedidos.entity';
import { Operadores, OperadorSchema } from './entities/operadores.entity';
import { PedidoController } from './controllers/pedido.controller';
import { OperadorController } from './controllers/operador.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Operador,
      Comprador,
      Pedido,
      DetallePedido,
      Producto,
    ]),
    MongooseModule.forFeature([
      {
        name: Compradores.name,
        schema: CompradorSchema,
      },
      {
        name: Pedidos.name,
        schema: PedidoSchema,
      },
      {
        name: Operadores.name,
        schema: OperadorSchema,
      },
    ]),
    ProductosModule,
  ],
  controllers: [
    OperadoresController,
    CompradoresController,
    DetallePedidoController,
    PedidosController,
    CompradorController,
    PedidoController,
    OperadorController,
  ],
  providers: [
    OperadoresService,
    CompradoresService,
    PedidosService,
    DetallePedidoService,
    CompradorService,
    PedidoService,
    OperadorService,
  ],
  exports: [OperadorService],
})
export class OperadoresModule {}
