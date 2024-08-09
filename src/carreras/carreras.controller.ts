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

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.carrerasService.findOne(id);
  }

  @Post('buscar')
  findCarrera(@Body() body: { nombre?: string }) {
    const { nombre } = body;
    return this.carrerasService.findCarrera(nombre);
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
