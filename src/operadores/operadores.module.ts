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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Operador,
      Comprador,
      Pedido,
      DetallePedido,
      Producto,
    ]),
    ProductosModule,
  ],
  controllers: [
    OperadoresController,
    CompradoresController,
    DetallePedidoController,
    PedidosController,
  ],
  providers: [
    OperadoresService,
    CompradoresService,
    PedidosService,
    DetallePedidoService,
  ],
})
export class OperadoresModule {}
