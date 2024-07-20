import { Test, TestingModule } from '@nestjs/testing';
import { DetalleHorariosService } from './detalle_horarios.service';

describe('DetalleHorariosService', () => {
  let service: DetalleHorariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleHorariosService],
    }).compile();

    service = module.get<DetalleHorariosService>(DetalleHorariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
