import { Test, TestingModule } from '@nestjs/testing';
import { MaquinasService } from './maquinas.service';

describe('MaquinasService', () => {
  let service: MaquinasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaquinasService],
    }).compile();

    service = module.get<MaquinasService>(MaquinasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
