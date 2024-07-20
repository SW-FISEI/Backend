import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleMateriasService } from './detalle_materias.service';
import { CreateDetalleMateriaDto } from './dto/create-detalle_materia.dto';
import { UpdateDetalleMateriaDto } from './dto/update-detalle_materia.dto';

@Controller('detalle-materias')
export class DetalleMateriasController {
  constructor(private readonly detalleMateriasService: DetalleMateriasService) {}

  @Post()
  create(@Body() createDetalleMateriaDto: CreateDetalleMateriaDto) {
    return this.detalleMateriasService.create(createDetalleMateriaDto);
  }

  @Get()
  findAll() {
    return this.detalleMateriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleMateriasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleMateriaDto: UpdateDetalleMateriaDto) {
    return this.detalleMateriasService.update(+id, updateDetalleMateriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleMateriasService.remove(+id);
  }
}
