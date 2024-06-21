import { Test, TestingModule } from '@nestjs/testing';
import { CompradorController } from './comprador.controller';
import { CompradorService } from '../services/comprador.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Compradores, CompradorSchema } from '../entities/compradores.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../../config';

describe('CompradorController', () => {
  let controller: CompradorController;

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
      controllers: [CompradorController],
      providers: [CompradorService],
    }).compile();

    controller = module.get<CompradorController>(CompradorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
