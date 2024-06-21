import { Test, TestingModule } from '@nestjs/testing';
import { OperadorController } from './operador.controller';
import { OperadorService } from '../services/operador.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../../config';
import { Operadores, OperadorSchema } from '../entities/operadores.entity';

describe('OperadorController', () => {
  let controller: OperadorController;

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
          { name: Operadores.name, schema: OperadorSchema },
        ]),
      ],
      controllers: [OperadorController],
      providers: [OperadorService],
    }).compile();

    controller = module.get<OperadorController>(OperadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
