import { Module } from '@nestjs/common';
import { LaboratoristasService } from './laboratoristas.service';
import { LaboratoristasController } from './laboratoristas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laboratorista } from './entities/laboratorista.entity';
import { TitulosModule } from 'src/titulos/titulos.module';
import { EdificiosModule } from 'src/edificios/edificios.module';
import { TitulosService } from 'src/titulos/titulos.service';
import { EdificiosService } from 'src/edificios/edificios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Laboratorista]), TitulosModule, EdificiosModule],
  controllers: [LaboratoristasController],
  providers: [LaboratoristasService, TitulosService, EdificiosService],
  exports: [TypeOrmModule]
})
export class LaboratoristasModule { }
