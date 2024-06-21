import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaService } from './categoria.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../../config';
import { Categorias, CategoriaSchema } from '../entities/categorias.entity';

describe('CategoriaService', () => {
  let service: CategoriaService;

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
          { name: Categorias.name, schema: CategoriaSchema },
        ]),
      ],
      providers: [CategoriaService],
    }).compile();

    service = module.get<CategoriaService>(CategoriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
