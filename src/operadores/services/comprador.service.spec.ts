import { Test, TestingModule } from '@nestjs/testing';
import { CompradorService } from './comprador.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Compradores, CompradorSchema } from '../entities/compradores.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../../config';

describe('CompradorService', () => {
  let service: CompradorService;

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
          { name: Compradores.name, schema: CompradorSchema },
        ]),
      ],
      providers: [CompradorService],
    }).compile();

    service = module.get<CompradorService>(CompradorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
