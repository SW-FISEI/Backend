import { Module } from '@nestjs/common';
import { TitulosService } from './titulos.service';
import { TitulosController } from './titulos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Titulo } from './entities/titulo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Titulo])],
  controllers: [TitulosController],
  providers: [TitulosService],
  exports: [TypeOrmModule]
})
export class TitulosModule { }
