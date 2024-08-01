import { Module } from '@nestjs/common';
import { DetalleMateriasService } from './detalle_materias.service';
import { DetalleMateriasController } from './detalle_materias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrerasModule } from 'src/carreras/carreras.module';
import { SemestresModule } from 'src/semestres/semestres.module';
import { MateriasModule } from 'src/materias/materias.module';
import { ParalelosModule } from 'src/paralelos/paralelos.module';
import { CarrerasService } from 'src/carreras/carreras.service';
import { SemestresService } from 'src/semestres/semestres.service';
import { MateriasService } from 'src/materias/materias.service';
import { ParalelosService } from 'src/paralelos/paralelos.service';
import { DetalleMateria } from './entities/detalle_materia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleMateria]), CarrerasModule, SemestresModule, MateriasModule, ParalelosModule],
  controllers: [DetalleMateriasController],
  providers: [DetalleMateriasService, CarrerasService, SemestresService, MateriasService, ParalelosService],
  exports: [TypeOrmModule]
})
export class DetalleMateriasModule { }
