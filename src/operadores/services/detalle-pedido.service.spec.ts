import { Test, TestingModule } from '@nestjs/testing';
import { DetallePedidoService } from './detalle-pedido.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comprador } from '../entities/comprador.entity';
import { Pedido } from '../entities/pedido.entity';
import { DetallePedido } from '../entities/detallePedido.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { Fabricante } from '../../productos/entities/fabricante.entity';
import { Categoria } from '../../productos/entities/categoria.entity';
import { Operador } from '../entities/operador.entity';

describe('DetallePedidoService', () => {
  let service: DetallePedidoService;

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
                DetallePedido,
                Producto,
                Fabricante,
                Categoria,
                Pedido,
                Comprador,
                Operador,
              ],
            };
          },
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([DetallePedido, Pedido, Producto]),
      ],
      providers: [DetallePedidoService],
    }).compile();

    service = module.get<DetallePedidoService>(DetallePedidoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
