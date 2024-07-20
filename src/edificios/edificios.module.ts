import { Module } from '@nestjs/common';
import { EdificiosService } from './edificios.service';
import { EdificiosController } from './edificios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Edificio } from './entities/edificio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Edificio])],
  controllers: [EdificiosController],
  providers: [EdificiosService],
  exports: [TypeOrmModule]
})
export class EdificiosModule { }
