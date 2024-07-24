import { Module } from '@nestjs/common';
import { ObservacionesService } from './observaciones.service';
import { ObservacionesController } from './observaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observacione } from './entities/observacione.entity';
import { MaquinasService } from 'src/maquinas/maquinas.service';
import { Maquina } from 'src/maquinas/entities/maquina.entity';
import { Aula } from 'src/aulas/entities/aula.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Observacione, Maquina, Aula])],
  controllers: [ObservacionesController],
  providers: [ObservacionesService, MaquinasService],
  exports: [TypeOrmModule]
})
export class ObservacionesModule { }
