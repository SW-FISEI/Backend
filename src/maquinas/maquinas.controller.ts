import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaquinasService } from './maquinas.service';
import { CreateMaquinaDto } from './dto/create-maquina.dto';
import { UpdateMaquinaDto } from './dto/update-maquina.dto';

@Controller('maquinas')
export class MaquinasController {
  constructor(private readonly maquinasService: MaquinasService) {}

  @Post()
  create(@Body() createMaquinaDto: CreateMaquinaDto) {
    return this.maquinasService.create(createMaquinaDto);
  }

  @Get()
  findAll() {
    return this.maquinasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maquinasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaquinaDto: UpdateMaquinaDto) {
    return this.maquinasService.update(+id, updateMaquinaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maquinasService.remove(+id);
  }
}
