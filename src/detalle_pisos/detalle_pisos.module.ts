import { Module } from '@nestjs/common';
import { DetallePisosService } from './detalle_pisos.service';
import { DetallePisosController } from './detalle_pisos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallePiso } from './entities/detalle_piso.entity';
import { EdificiosModule } from 'src/edificios/edificios.module';
import { PisosModule } from 'src/pisos/pisos.module';
import { PisosService } from 'src/pisos/pisos.service';
import { EdificiosService } from 'src/edificios/edificios.service';

@Module({
  imports: [TypeOrmModule.forFeature([DetallePiso]), PisosModule, EdificiosModule],
  controllers: [DetallePisosController],
  providers: [DetallePisosService, PisosService, EdificiosService],
  exports: [TypeOrmModule]
})
export class DetallePisosModule { }
