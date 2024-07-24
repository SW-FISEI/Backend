import { Module } from '@nestjs/common';
import { HorariosService } from './horarios.service';
import { HorariosController } from './horarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Horario } from './entities/horario.entity';
import { PeriodosModule } from 'src/periodos/periodos.module';
import { PeriodosService } from 'src/periodos/periodos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Horario]), PeriodosModule],
  controllers: [HorariosController],
  providers: [HorariosService, PeriodosService],
  exports: [TypeOrmModule]
})
export class HorariosModule { }
