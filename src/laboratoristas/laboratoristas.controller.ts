import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LaboratoristasService } from './laboratoristas.service';
import { CreateLaboratoristaDto } from './dto/create-laboratorista.dto';
import { UpdateLaboratoristaDto } from './dto/update-laboratorista.dto';

@Controller('laboratoristas')
export class LaboratoristasController {
  constructor(private readonly laboratoristasService: LaboratoristasService) {}

  @Post()
  create(@Body() createLaboratoristaDto: CreateLaboratoristaDto) {
    return this.laboratoristasService.create(createLaboratoristaDto);
  }

  @Get()
  findAll() {
    return this.laboratoristasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.laboratoristasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLaboratoristaDto: UpdateLaboratoristaDto) {
    return this.laboratoristasService.update(+id, updateLaboratoristaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.laboratoristasService.remove(+id);
  }
}
