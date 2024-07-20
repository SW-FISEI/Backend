import { Module } from '@nestjs/common';
import { SemestresService } from './semestres.service';
import { SemestresController } from './semestres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Semestre } from './entities/semestre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Semestre])],
  controllers: [SemestresController],
  providers: [SemestresService],
  exports: [TypeOrmModule]
})
export class SemestresModule { }
