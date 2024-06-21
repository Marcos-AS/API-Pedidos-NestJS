import { Test, TestingModule } from '@nestjs/testing';
import { PedidoController } from './pedido.controller';
import { PedidoService } from '../services/pedido.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../../config';
import { Pedidos, PedidoSchema } from '../entities/pedidos.entity';

describe('PedidoController', () => {
  let controller: PedidoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            const { user, host, password, port, connection } =
              configService.get('config').mongo;
            return {
              uri: `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`,
            };
          },
          inject: [ConfigService],
        }),
        MongooseModule.forFeature([
          { name: Pedidos.name, schema: PedidoSchema },
        ]),
      ],
      controllers: [PedidoController],
      providers: [PedidoService],
    }).compile();

    controller = module.get<PedidoController>(PedidoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
