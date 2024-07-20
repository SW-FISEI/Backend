import { Test, TestingModule } from '@nestjs/testing';
import { LaboratoristasController } from './laboratoristas.controller';
import { LaboratoristasService } from './laboratoristas.service';

describe('LaboratoristasController', () => {
  let controller: LaboratoristasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LaboratoristasController],
      providers: [LaboratoristasService],
    }).compile();

    controller = module.get<LaboratoristasController>(LaboratoristasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
