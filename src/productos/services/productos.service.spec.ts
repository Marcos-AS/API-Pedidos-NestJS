import { Test, TestingModule } from '@nestjs/testing';
import { ProductosService } from './productos.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { Fabricante } from '../../productos/entities/fabricante.entity';
import { Categoria } from '../../productos/entities/categoria.entity';

describe('ProductosService', () => {
  let service: ProductosService;

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
              entities: [Categoria, Producto, Fabricante],
            };
          },
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([Producto, Categoria, Fabricante]),
      ],
      providers: [ProductosService],
    }).compile();

    service = module.get<ProductosService>(ProductosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
