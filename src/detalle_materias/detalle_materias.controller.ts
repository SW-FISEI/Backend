import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleMateriasService } from './detalle_materias.service';
import { CreateDetalleMateriaDto } from './dto/create-detalle_materia.dto';
import { UpdateDetalleMateriaDto } from './dto/update-detalle_materia.dto';

@Controller('detalle-materias')
export class DetalleMateriasController {
  constructor(private readonly detalleMateriasService: DetalleMateriasService) { }

  @Post()
  create(@Body() createDetalleMateriaDto: CreateDetalleMateriaDto) {
    return this.detalleMateriasService.create(createDetalleMateriaDto);
  }

  @Get()
  findAll() {
    return this.detalleMateriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.detalleMateriasService.findOne(id);
  }

  @Get('/carrera/:carrera')
  findCarrera(@Param('carrera') carrera: number) {
    return this.detalleMateriasService.findCarrera(carrera)
  }

  @Get('semestre/:semestre')
  findSemestre(@Param('semestre') semestre: number) {
    return this.detalleMateriasService.findSemestre(semestre)
  }

  @Get('/materia/:materia')
  findMateria(@Param('materia') materia: number) {
    return this.detalleMateriasService.findMateria(materia)
  }

  @Get('/paralelo/:paralelo')
  findParalelo(@Param('paralelo') paralelo: number) {
    return this.detalleMateriasService.findParalelo(paralelo)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDetalleMateriaDto: UpdateDetalleMateriaDto) {
    return this.detalleMateriasService.update(id, updateDetalleMateriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.detalleMateriasService.remove(id);
  }
}
