import { Test, TestingModule } from '@nestjs/testing';
import { AccionesBdService } from './acciones_bd.service';

describe('AccionesBdService', () => {
  let service: AccionesBdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccionesBdService],
    }).compile();

    service = module.get<AccionesBdService>(AccionesBdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
