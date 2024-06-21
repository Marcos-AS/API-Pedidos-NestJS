import { Test, TestingModule } from '@nestjs/testing';
import { PedidoService } from './pedido.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../../config';
import { Pedidos, PedidoSchema } from '../entities/pedidos.entity';

describe('PedidoService', () => {
  let service: PedidoService;

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
      providers: [PedidoService],
    }).compile();

    service = module.get<PedidoService>(PedidoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
