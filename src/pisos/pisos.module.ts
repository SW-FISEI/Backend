import { Module } from '@nestjs/common';
import { PisosService } from './pisos.service';
import { PisosController } from './pisos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Piso } from './entities/piso.entity';
import { EdificiosModule } from 'src/edificios/edificios.module';
import { EdificiosService } from 'src/edificios/edificios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Piso]), EdificiosModule],
  controllers: [PisosController],
  providers: [PisosService, EdificiosService],
  exports: [TypeOrmModule]
})
export class PisosModule { }
