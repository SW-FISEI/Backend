import { Test, TestingModule } from '@nestjs/testing';
import { SugerenciasService } from './sugerencias.service';

describe('SugerenciasService', () => {
  let service: SugerenciasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SugerenciasService],
    }).compile();

    service = module.get<SugerenciasService>(SugerenciasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
