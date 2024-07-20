import { Test, TestingModule } from '@nestjs/testing';
import { SoftwareAulasController } from './software_aulas.controller';
import { SoftwareAulasService } from './software_aulas.service';

describe('SoftwareAulasController', () => {
  let controller: SoftwareAulasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoftwareAulasController],
      providers: [SoftwareAulasService],
    }).compile();

    controller = module.get<SoftwareAulasController>(SoftwareAulasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
