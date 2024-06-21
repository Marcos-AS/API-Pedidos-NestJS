import { Test, TestingModule } from '@nestjs/testing';
import { CompradoresController } from './compradores.controller';
import { CompradoresService } from '../services/compradores.service';
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

describe('CompradoresController', () => {
  let controller: CompradoresController;

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
                Comprador,
                Operador,
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
        TypeOrmModule.forFeature([Comprador]),
      ],
      controllers: [CompradoresController],
      providers: [CompradoresService],
    }).compile();

    controller = module.get<CompradoresController>(CompradoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
