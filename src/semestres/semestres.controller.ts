import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SemestresService } from './semestres.service';
import { CreateSemestreDto } from './dto/create-semestre.dto';
import { UpdateSemestreDto } from './dto/update-semestre.dto';

@Controller('semestres')
export class SemestresController {
  constructor(private readonly semestresService: SemestresService) { }

  @Post()
  create(@Body() createSemestreDto: CreateSemestreDto) {
    return this.semestresService.create(createSemestreDto);
  }

  @Get()
  findAll() {
    return this.semestresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.semestresService.findOne(id);
  }

  @Get('/nombre/:nombre')
  findOneByName(@Param('nombre') nombre: string) {
    return this.semestresService.findOneByName(nombre);
  }

  @Get('/key/:nombre')
  findOneByKey(@Param('nombre') nombre: string) {
    return this.semestresService.findOneByKey(nombre);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSemestreDto: UpdateSemestreDto) {
    return this.semestresService.update(id, updateSemestreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.semestresService.remove(id);
  }
}
