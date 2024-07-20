import { Module } from '@nestjs/common';
import { AccionesBdService } from './acciones_bd.service';
import { AccionesBdController } from './acciones_bd.controller';

@Module({
  controllers: [AccionesBdController],
  providers: [AccionesBdService],
})
export class AccionesBdModule {}
