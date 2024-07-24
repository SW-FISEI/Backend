import { Module } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { DocentesController } from './docentes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Docente } from './entities/docente.entity';
import { TitulosModule } from 'src/titulos/titulos.module';
import { TitulosService } from 'src/titulos/titulos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Docente]), TitulosModule],
  controllers: [DocentesController],
  providers: [DocentesService, TitulosService],
  exports: [TypeOrmModule]
})
export class DocentesModule { }
