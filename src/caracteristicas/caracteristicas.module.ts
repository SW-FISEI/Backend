import { forwardRef, Module } from '@nestjs/common';
import { CaracteristicasService } from './caracteristicas.service';
import { CaracteristicasController } from './caracteristicas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caracteristica } from './entities/caracteristica.entity';
import { AulasModule } from 'src/aulas/aulas.module';
import { AulasService } from 'src/aulas/aulas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Caracteristica]), forwardRef(() => AulasModule)],
  controllers: [CaracteristicasController],
  providers: [CaracteristicasService, AulasService],
  exports: [TypeOrmModule]
})
export class CaracteristicasModule { }
