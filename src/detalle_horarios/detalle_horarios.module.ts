import { Module } from '@nestjs/common';
import { DetalleHorariosService } from './detalle_horarios.service';
import { DetalleHorariosController } from './detalle_horarios.controller';

@Module({
  controllers: [DetalleHorariosController],
  providers: [DetalleHorariosService],
})
export class DetalleHorariosModule {}
