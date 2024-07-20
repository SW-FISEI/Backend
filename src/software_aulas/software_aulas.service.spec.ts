import { Test, TestingModule } from '@nestjs/testing';
import { SoftwareAulasService } from './software_aulas.service';

describe('SoftwareAulasService', () => {
  let service: SoftwareAulasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoftwareAulasService],
    }).compile();

    service = module.get<SoftwareAulasService>(SoftwareAulasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
