import { Module } from '@nestjs/common';
import { PisosService } from './pisos.service';
import { PisosController } from './pisos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Piso } from './entities/piso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Piso])],
  controllers: [PisosController],
  providers: [PisosService],
  exports: [TypeOrmModule]
})
export class PisosModule { }
