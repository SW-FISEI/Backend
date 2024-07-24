import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PisosService } from './pisos.service';
import { CreatePisoDto } from './dto/create-piso.dto';
import { UpdatePisoDto } from './dto/update-piso.dto';

@Controller('pisos')
export class PisosController {
  constructor(private readonly pisosService: PisosService) { }

  @Post()
  create(@Body() createPisoDto: CreatePisoDto) {
    return this.pisosService.create(createPisoDto);
  }

  @Get()
  findAll() {
    return this.pisosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pisosService.findOne(id);
  }

  @Get('/piso/:nombre')
  findName(@Param('nombre') nombre: string) {
    return this.pisosService.findName(nombre);
  }

  @Post('/piso')
  findNameByKey(@Body() body: { nombre: string }) {
    const { nombre } = body;
    return this.pisosService.findNameByKey(nombre);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePisoDto: UpdatePisoDto) {
    return this.pisosService.update(id, updatePisoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.pisosService.remove(id);
  }
}
