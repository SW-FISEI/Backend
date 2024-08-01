import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleHorariosService } from './detalle_horarios.service';
import { CreateDetalleHorarioDto } from './dto/create-detalle_horario.dto';
import { UpdateDetalleHorarioDto } from './dto/update-detalle_horario.dto';

@Controller('detalle-horarios')
export class DetalleHorariosController {
  constructor(private readonly detalleHorariosService: DetalleHorariosService) { }

  @Post()
  create(@Body() createDetalleHorarioDto: CreateDetalleHorarioDto) {
    return this.detalleHorariosService.create(createDetalleHorarioDto);
  }

  @Get()
  findAll() {
    return this.detalleHorariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.detalleHorariosService.findOne(id);
  }

  @Get('/aula/:aula')
  findAula(@Param('aula') aula: number) {
    return this.detalleHorariosService.findAula(aula);
  }

  @Get('/materia/:materia')
  findMateria(@Param('materia') materia: number) {
    return this.detalleHorariosService.findMateria(materia);
  }

  @Get('/horario/:horario')
  findHorario(@Param('horario') horario: number) {
    return this.detalleHorariosService.findHorario(horario);
  }

  @Get('/docente/:docente')
  findDocente(@Param('docente') docente: string) {
    return this.detalleHorariosService.findDocente(docente);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDetalleHorarioDto: UpdateDetalleHorarioDto) {
    return this.detalleHorariosService.update(id, updateDetalleHorarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.detalleHorariosService.remove(id);
  }
}
