import { Test, TestingModule } from '@nestjs/testing';
import { OperadorService } from './operador.service';

describe('OperadorService', () => {
  let service: OperadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperadorService],
    }).compile();

    service = module.get<OperadorService>(OperadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
