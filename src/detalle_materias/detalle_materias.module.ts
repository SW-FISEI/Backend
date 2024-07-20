import { Module } from '@nestjs/common';
import { DetalleMateriasService } from './detalle_materias.service';
import { DetalleMateriasController } from './detalle_materias.controller';

@Module({
  controllers: [DetalleMateriasController],
  providers: [DetalleMateriasService],
})
export class DetalleMateriasModule {}
