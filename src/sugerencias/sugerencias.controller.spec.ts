import { Test, TestingModule } from '@nestjs/testing';
import { SugerenciasController } from './sugerencias.controller';
import { SugerenciasService } from './sugerencias.service';

describe('SugerenciasController', () => {
  let controller: SugerenciasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SugerenciasController],
      providers: [SugerenciasService],
    }).compile();

    controller = module.get<SugerenciasController>(SugerenciasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
