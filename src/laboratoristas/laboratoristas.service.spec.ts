import { Test, TestingModule } from '@nestjs/testing';
import { LaboratoristasService } from './laboratoristas.service';

describe('LaboratoristasService', () => {
  let service: LaboratoristasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LaboratoristasService],
    }).compile();

    service = module.get<LaboratoristasService>(LaboratoristasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
