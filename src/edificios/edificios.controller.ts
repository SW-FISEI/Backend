import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EdificiosService } from './edificios.service';
import { CreateEdificioDto } from './dto/create-edificio.dto';
import { UpdateEdificioDto } from './dto/update-edificio.dto';

@Controller('edificios')
export class EdificiosController {
  constructor(private readonly edificiosService: EdificiosService) { }

  @Post()
  create(@Body() createEdificioDto: CreateEdificioDto) {
    return this.edificiosService.create(createEdificioDto);
  }

  @Get()
  findAll() {
    return this.edificiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.edificiosService.findOne(id);
  }

  @Get('nombre/:nombre')
  findOneName(@Param('nombre') nombre: string) {
    return this.edificiosService.findOneName(nombre);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEdificioDto: UpdateEdificioDto) {
    return this.edificiosService.update(id, updateEdificioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.edificiosService.remove(id);
  }
}
