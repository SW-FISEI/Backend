import { Module } from '@nestjs/common';
import { SoftwareAulasService } from './software_aulas.service';
import { SoftwareAulasController } from './software_aulas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoftwareAula } from './entities/software_aula.entity';
import { SoftwaresModule } from 'src/softwares/softwares.module';
import { AulasModule } from 'src/aulas/aulas.module';

@Module({
  imports: [TypeOrmModule.forFeature([SoftwareAula]), SoftwaresModule, AulasModule],
  controllers: [SoftwareAulasController],
  providers: [SoftwareAulasService],
  exports: [TypeOrmModule]
})
export class SoftwareAulasModule { }
