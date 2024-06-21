import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { OperadorService } from '../../operadores/services/operador.service';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../../config';
import {
  Operadores,
  OperadorSchema,
} from '../../operadores/entities/operadores.entity';

describe('AuthService', () => {
  let service: AuthService;

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
      providers: [AuthService, OperadorService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
