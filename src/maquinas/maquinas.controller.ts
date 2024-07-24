import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaquinasService } from './maquinas.service';
import { CreateMaquinaDto } from './dto/create-maquina.dto';
import { UpdateMaquinaDto } from './dto/update-maquina.dto';

@Controller('maquinas')
export class MaquinasController {
  constructor(private readonly maquinasService: MaquinasService) { }

  @Post()
  create(@Body() createMaquinaDto: CreateMaquinaDto) {
    return this.maquinasService.create(createMaquinaDto);
  }

  @Get()
  findAll() {
    return this.maquinasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.maquinasService.findOne(id);
  }

  @Get('/aula/:aula')
  findAula(@Param('aula') aula: number) {
    return this.maquinasService.findAula(aula)
  }

  @Get('/nombre/:nombre')
  findMaquina(@Param('nombre') nombre: string) {
    return this.maquinasService.findMaquina(nombre)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMaquinaDto: UpdateMaquinaDto) {
    return this.maquinasService.update(id, updateMaquinaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.maquinasService.remove(id);
  }
}
