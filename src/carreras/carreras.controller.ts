import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarrerasService } from './carreras.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enum/rol.enum';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Carreras')
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@ApiBearerAuth()
@Auth(Rol.USER)
@Controller('carreras')
export class CarrerasController {
  constructor(private readonly carrerasService: CarrerasService) { }

  @Post()
  create(@Body() createCarreraDto: CreateCarreraDto) {
    return this.carrerasService.create(createCarreraDto);
  }

  @Get()
  findAll() {
    return this.carrerasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.carrerasService.findOne(id);
  }

  @Get('/name/:nombre')
  findOneByName(@Param('nombre') nombre: string) {
    return this.carrerasService.findOneByName(nombre);
  }

  @Get('/key/:nombre')
  findOneByKey(@Param('nombre') nombre: string) {
    return this.carrerasService.findOneByKey(nombre);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCarreraDto: UpdateCarreraDto) {
    return this.carrerasService.update(id, updateCarreraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.carrerasService.remove(id);
  }
}
