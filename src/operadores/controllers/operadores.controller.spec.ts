import { Test, TestingModule } from '@nestjs/testing';
import { OperadoresController } from './operadores.controller';
import { OperadoresService } from '../services/operadores.service';
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

describe('OperadoresController', () => {
  let controller: OperadoresController;

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
        TypeOrmModule.forFeature([Operador, Comprador, Producto]),
      ],
      controllers: [OperadoresController],
      providers: [OperadoresService],
    }).compile();

    controller = module.get<OperadoresController>(OperadoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
