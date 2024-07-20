import { Test, TestingModule } from '@nestjs/testing';
import { DetalleMateriasController } from './detalle_materias.controller';
import { DetalleMateriasService } from './detalle_materias.service';

describe('DetalleMateriasController', () => {
  let controller: DetalleMateriasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleMateriasController],
      providers: [DetalleMateriasService],
    }).compile();

    controller = module.get<DetalleMateriasController>(DetalleMateriasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
