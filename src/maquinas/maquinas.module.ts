import { Module } from '@nestjs/common';
import { MaquinasService } from './maquinas.service';
import { MaquinasController } from './maquinas.controller';

@Module({
  controllers: [MaquinasController],
  providers: [MaquinasService],
})
export class MaquinasModule {}
