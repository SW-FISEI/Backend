import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SoftwareAulasService } from './software_aulas.service';
import { CreateSoftwareAulaDto } from './dto/create-software_aula.dto';
import { UpdateSoftwareAulaDto } from './dto/update-software_aula.dto';

@Controller('software-aulas')
export class SoftwareAulasController {
  constructor(private readonly softwareAulasService: SoftwareAulasService) {}

  @Post()
  create(@Body() createSoftwareAulaDto: CreateSoftwareAulaDto) {
    return this.softwareAulasService.create(createSoftwareAulaDto);
  }

  @Get()
  findAll() {
    return this.softwareAulasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.softwareAulasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSoftwareAulaDto: UpdateSoftwareAulaDto) {
    return this.softwareAulasService.update(+id, updateSoftwareAulaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softwareAulasService.remove(+id);
  }
}
