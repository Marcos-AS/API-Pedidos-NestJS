import { Test, TestingModule } from '@nestjs/testing';
import { ProductoService } from './producto.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../../config';
import { Productos, ProductoSchema } from '../entities/productos.entity';

describe('ProductoService', () => {
  let service: ProductoService;

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
          { name: Productos.name, schema: ProductoSchema },
        ]),
      ],
      providers: [ProductoService],
    }).compile();

    service = module.get<ProductoService>(ProductoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
