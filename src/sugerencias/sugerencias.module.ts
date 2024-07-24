import { Module } from '@nestjs/common';
import { SugerenciasService } from './sugerencias.service';
import { SugerenciasController } from './sugerencias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sugerencia } from './entities/sugerencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sugerencia])],
  controllers: [SugerenciasController],
  providers: [SugerenciasService],
  exports: [TypeOrmModule]
})
export class SugerenciasModule { }
