import { Module } from '@nestjs/common';
import { ParalelosService } from './paralelos.service';
import { ParalelosController } from './paralelos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paralelo } from './entities/paralelo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paralelo])],
  controllers: [ParalelosController],
  providers: [ParalelosService],
  exports: [TypeOrmModule]
})
export class ParalelosModule { }
