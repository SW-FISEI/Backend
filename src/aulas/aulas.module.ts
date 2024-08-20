import { Module } from '@nestjs/common';
import { AulasService } from './aulas.service';
import { AulasController } from './aulas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aula } from './entities/aula.entity';
import { PisosService } from 'src/pisos/pisos.service';
import { EdificiosService } from 'src/edificios/edificios.service';
import { Piso } from 'src/pisos/entities/piso.entity';
import { Edificio } from 'src/edificios/entities/edificio.entity';
import { DetallePiso } from 'src/detalle_pisos/entities/detalle_piso.entity';
import { DetallePisosService } from 'src/detalle_pisos/detalle_pisos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Aula, Piso, Edificio, DetallePiso])],
  controllers: [AulasController],
  providers: [AulasService, PisosService, EdificiosService, DetallePisosService],
  exports: [TypeOrmModule]
})
export class AulasModule { }
