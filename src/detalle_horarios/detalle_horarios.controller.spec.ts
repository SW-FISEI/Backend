import { Test, TestingModule } from '@nestjs/testing';
import { DetalleHorariosController } from './detalle_horarios.controller';
import { DetalleHorariosService } from './detalle_horarios.service';

describe('DetalleHorariosController', () => {
  let controller: DetalleHorariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleHorariosController],
      providers: [DetalleHorariosService],
    }).compile();

    controller = module.get<DetalleHorariosController>(DetalleHorariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
