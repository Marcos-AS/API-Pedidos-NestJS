import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasService } from './categorias.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { Fabricante } from '../../productos/entities/fabricante.entity';
import { Categoria } from '../../productos/entities/categoria.entity';

describe('CategoriasService', () => {
  let service: CategoriasService;

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
        TypeOrmModule.forFeature([Categoria]),
      ],
      providers: [CategoriasService],
    }).compile();

    service = module.get<CategoriasService>(CategoriasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
