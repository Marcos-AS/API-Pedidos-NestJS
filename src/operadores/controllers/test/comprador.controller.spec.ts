import { Test, TestingModule } from '@nestjs/testing';
import { CompradorController } from './comprador.controller';

describe('CompradorController', () => {
  let controller: CompradorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompradorController],
    }).compile();

    controller = module.get<CompradorController>(CompradorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
