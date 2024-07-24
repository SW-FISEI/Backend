import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AulasService } from './aulas.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';

@Controller('aulas')
export class AulasController {
  constructor(private readonly aulasService: AulasService) { }

  @Post()
  create(@Body() createAulaDto: CreateAulaDto) {
    return this.aulasService.create(createAulaDto);
  }

  @Get()
  findAll() {
    return this.aulasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.aulasService.findOne(id);
  }

  @Get('/piso/:piso')
  findPiso(@Param('piso') piso: number) {
    return this.aulasService.findPiso(piso);
  }

  @Get('/caracteristica/:caracteristica')
  findCaracteristica(@Param('caracteristica') caracteristica: number) {
    return this.aulasService.findCaracteristica(caracteristica);
  }

  @Get('/nombre/:nombre')
  findNombre(@Param('nombre') nombre: string) {
    return this.aulasService.findNombre(nombre);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAulaDto: UpdateAulaDto) {
    return this.aulasService.update(id, updateAulaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.aulasService.remove(id);
  }
}
