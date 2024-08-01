import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SoftwareAulasService } from './software_aulas.service';
import { CreateSoftwareAulaDto } from './dto/create-software_aula.dto';
import { UpdateSoftwareAulaDto } from './dto/update-software_aula.dto';

@Controller('software-aulas')
export class SoftwareAulasController {
  constructor(private readonly softwareAulasService: SoftwareAulasService) { }

  @Post()
  create(@Body() createSoftwareAulaDto: CreateSoftwareAulaDto) {
    return this.softwareAulasService.create(createSoftwareAulaDto);
  }

  @Get()
  findAll() {
    return this.softwareAulasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.softwareAulasService.findOne(id);
  }

  @Get('/software/:software')
  findSoftware(@Param('software') software: number) {
    return this.softwareAulasService.findSoftware(software);
  }

  @Get('/aula/:aula')
  findAula(@Param('aula') aula: number) {
    return this.softwareAulasService.findAula(aula);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSoftwareAulaDto: UpdateSoftwareAulaDto) {
    return this.softwareAulasService.update(id, updateSoftwareAulaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.softwareAulasService.remove(id);
  }
}
