import { Module } from '@nestjs/common';
import { SoftwaresService } from './softwares.service';
import { SoftwaresController } from './softwares.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Software } from './entities/software.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Software])],
  controllers: [SoftwaresController],
  providers: [SoftwaresService],
  exports: [TypeOrmModule]
})
export class SoftwaresModule { }
