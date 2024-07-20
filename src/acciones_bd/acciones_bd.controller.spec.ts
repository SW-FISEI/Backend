import { Test, TestingModule } from '@nestjs/testing';
import { AccionesBdController } from './acciones_bd.controller';
import { AccionesBdService } from './acciones_bd.service';

describe('AccionesBdController', () => {
  let controller: AccionesBdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccionesBdController],
      providers: [AccionesBdService],
    }).compile();

    controller = module.get<AccionesBdController>(AccionesBdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
