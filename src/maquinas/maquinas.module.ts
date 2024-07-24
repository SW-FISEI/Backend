import { Module } from '@nestjs/common';
import { MaquinasService } from './maquinas.service';
import { MaquinasController } from './maquinas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maquina } from './entities/maquina.entity';
import { AulasModule } from 'src/aulas/aulas.module';
import { AulasService } from 'src/aulas/aulas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Maquina]), AulasModule],
  controllers: [MaquinasController],
  providers: [MaquinasService, AulasService],
  exports: [TypeOrmModule]
})
export class MaquinasModule { }
