import { Module } from '@nestjs/common';
import { SoftwareAulasService } from './software_aulas.service';
import { SoftwareAulasController } from './software_aulas.controller';

@Module({
  controllers: [SoftwareAulasController],
  providers: [SoftwareAulasService],
})
export class SoftwareAulasModule {}
