import { Test, TestingModule } from '@nestjs/testing';
import { MaquinasController } from './maquinas.controller';
import { MaquinasService } from './maquinas.service';

describe('MaquinasController', () => {
  let controller: MaquinasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaquinasController],
      providers: [MaquinasService],
    }).compile();

    controller = module.get<MaquinasController>(MaquinasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
