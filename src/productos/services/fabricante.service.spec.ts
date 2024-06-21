import { Test, TestingModule } from '@nestjs/testing';
import { FabricanteService } from './fabricante.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../../config';
import { Fabricantes, FabricanteSchema } from '../entities/fabricantes.entity';

describe('FabricanteService', () => {
  let service: FabricanteService;

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
          { name: Fabricantes.name, schema: FabricanteSchema },
        ]),
      ],
      providers: [FabricanteService],
    }).compile();

    service = module.get<FabricanteService>(FabricanteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
