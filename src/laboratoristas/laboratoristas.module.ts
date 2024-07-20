import { Module } from '@nestjs/common';
import { LaboratoristasService } from './laboratoristas.service';
import { LaboratoristasController } from './laboratoristas.controller';

@Module({
  controllers: [LaboratoristasController],
  providers: [LaboratoristasService],
})
export class LaboratoristasModule {}
