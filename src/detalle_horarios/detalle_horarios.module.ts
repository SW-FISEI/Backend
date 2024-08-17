import { Module } from '@nestjs/common';
import { DetalleHorariosService } from './detalle_horarios.service';
import { DetalleHorariosController } from './detalle_horarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleHorario } from './entities/detalle_horario.entity'
import { DetalleMateriasModule } from 'src/detalle_materias/detalle_materias.module';
import { DocentesModule } from 'src/docentes/docentes.module';
import { AulasModule } from 'src/aulas/aulas.module';
import { DetalleMateriasService } from 'src/detalle_materias/detalle_materias.service';
import { DocentesService } from 'src/docentes/docentes.service';
import { AulasService } from 'src/aulas/aulas.service';
import { CarrerasModule } from 'src/carreras/carreras.module';
import { SemestresModule } from 'src/semestres/semestres.module';
import { MateriasModule } from 'src/materias/materias.module';
import { ParalelosModule } from 'src/paralelos/paralelos.module';
import { PeriodosModule } from 'src/periodos/periodos.module';
import { CarrerasService } from 'src/carreras/carreras.service';
import { SemestresService } from 'src/semestres/semestres.service';
import { MateriasService } from 'src/materias/materias.service';
import { ParalelosService } from 'src/paralelos/paralelos.service';
import { TitulosModule } from 'src/titulos/titulos.module';
import { TitulosService } from 'src/titulos/titulos.service';
import { PeriodosService } from 'src/periodos/periodos.service';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleHorario]), CarrerasModule, SemestresModule, MateriasModule, ParalelosModule, DetalleMateriasModule, PeriodosModule, AulasModule, TitulosModule, DocentesModule],
  controllers: [DetalleHorariosController],
  providers: [DetalleHorariosService, CarrerasService, SemestresService, MateriasService, ParalelosService, DetalleMateriasService, AulasService, TitulosService, DocentesService, PeriodosService],
  exports: [TypeOrmModule]
})
export class DetalleHorariosModule { }
