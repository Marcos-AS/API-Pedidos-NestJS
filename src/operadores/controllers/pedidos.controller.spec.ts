import { Test, TestingModule } from '@nestjs/testing';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from '../services/pedidos.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comprador } from '../entities/comprador.entity';
import { Operador } from '../entities/operador.entity';
import { Pedido } from '../entities/pedido.entity';
import { DetallePedido } from '../entities/detallePedido.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { Fabricante } from '../../productos/entities/fabricante.entity';
import { Categoria } from '../../productos/entities/categoria.entity';

describe('PedidosController', () => {
  let controller: PedidosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => {
            const { user, host, name, password, port } =
              configService.get('config').postgres;
            return {
              type: 'postgres',
              host,
              port,
              username: user,
              password,
              database: name,
              synchronize: false,
              entities: [
                Operador,
                Comprador,
                Pedido,
                DetallePedido,
                Producto,
                Fabricante,
                Categoria,
              ],
            };
          },
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([Pedido, Comprador]),
      ],
      controllers: [PedidosController],
      providers: [PedidosService],
    }).compile();

    controller = module.get<PedidosController>(PedidosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
