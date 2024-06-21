import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;
  let configService: ConfigService;

  beforeEach(async () => {
    const mockDb = {
      //crea un mock de una función llamada collection
      collection: jest.fn().mockReturnValue({
        //el objeto q devuelve collection tiene una prop. findOne que es otra función mock
        findOne: jest.fn(),
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
      ],
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: 'MONGO',
          useValue: mockDb,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    configService = app.get<ConfigService>(ConfigService);
  });

  describe('root', () => {
    it('should return "La llave de la aplicación es: ..."', () => {
      const apiKey = configService.get<string>('config.apiKey');
      const dbName = configService.get<string>('config.database.name');
      const dbPort = configService.get<number>('config.database.port');
      expect(appController.getHello()).toBe(
        `La llave de la aplicación es: ${apiKey} y el nombre y puerto de la DB: ${dbName}, ${dbPort}`,
      );
    });
  });
});
