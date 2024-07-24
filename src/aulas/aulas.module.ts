import { forwardRef, Module } from '@nestjs/common';
import { AulasService } from './aulas.service';
import { AulasController } from './aulas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aula } from './entities/aula.entity';
import { CaracteristicasService } from 'src/caracteristicas/caracteristicas.service';
import { PisosService } from 'src/pisos/pisos.service';
import { EdificiosService } from 'src/edificios/edificios.service';
import { Caracteristica } from 'src/caracteristicas/entities/caracteristica.entity';
import { Piso } from 'src/pisos/entities/piso.entity';
import { Edificio } from 'src/edificios/entities/edificio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aula, Caracteristica, Piso, Edificio])],
  controllers: [AulasController],
  providers: [AulasService, CaracteristicasService, PisosService, EdificiosService],
  exports: [TypeOrmModule]
})
export class AulasModule { }
