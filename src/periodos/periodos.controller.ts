import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PeriodosService } from './periodos.service';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';

@Controller('periodos')
export class PeriodosController {
  constructor(private readonly periodosService: PeriodosService) { }

  @Post()
  create(@Body() createPeriodoDto: CreatePeriodoDto) {
    return this.periodosService.create(createPeriodoDto);
  }

  @Get()
  findAll() {
    return this.periodosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.periodosService.findOne(id);
  }

  @Get('/nombre/:nombre')
  findOneByName(@Param('nombre') nombre: string) {
    return this.periodosService.findOneByName(nombre);
  }

  @Get('/inicioM/:inicio')
  findOneByStartMonth(@Param('inicio') inicio: string) {
    return this.periodosService.findOneByStartMonth(inicio);
  }

  @Get('/inicioY/:inicio')
  findOneByStartYear(@Param('inicio') inicio: string) {
    return this.periodosService.findOneByStartYear(inicio);
  }

  @Get('/finM/:fin')
  findOneByEndMonth(@Param('fin') fin: string) {
    return this.periodosService.findOneByEndMonth(fin);
  }

  @Get('/finY/:fin')
  findOneByEndYear(@Param('fin') fin: string) {
    return this.periodosService.findOneByEndYear(fin);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePeriodoDto: UpdatePeriodoDto) {
    return this.periodosService.update(id, updatePeriodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.periodosService.remove(id);
  }
}
