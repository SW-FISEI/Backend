import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleHorariosService } from './detalle_horarios.service';
import { CreateDetalleHorarioDto } from './dto/create-detalle_horario.dto';
import { UpdateDetalleHorarioDto } from './dto/update-detalle_horario.dto';

@Controller('detalle-horarios')
export class DetalleHorariosController {
  constructor(private readonly detalleHorariosService: DetalleHorariosService) {}

  @Post()
  create(@Body() createDetalleHorarioDto: CreateDetalleHorarioDto) {
    return this.detalleHorariosService.create(createDetalleHorarioDto);
  }

  @Get()
  findAll() {
    return this.detalleHorariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleHorariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleHorarioDto: UpdateDetalleHorarioDto) {
    return this.detalleHorariosService.update(+id, updateDetalleHorarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleHorariosService.remove(+id);
  }
}
