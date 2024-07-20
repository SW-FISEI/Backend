import { Test, TestingModule } from '@nestjs/testing';
import { DetalleMateriasService } from './detalle_materias.service';

describe('DetalleMateriasService', () => {
  let service: DetalleMateriasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleMateriasService],
    }).compile();

    service = module.get<DetalleMateriasService>(DetalleMateriasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
