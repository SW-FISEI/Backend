import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ObservacionesService } from './observaciones.service';
import { CreateObservacioneDto } from './dto/create-observacione.dto';
import { UpdateObservacioneDto } from './dto/update-observacione.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enum/rol.enum';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Observaciones')
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@ApiBearerAuth()
@Auth(Rol.USER)
@Controller('observaciones')
export class ObservacionesController {
  constructor(private readonly observacionesService: ObservacionesService) { }

  @Post()
  create(@Body() createObservacioneDto: CreateObservacioneDto) {
    return this.observacionesService.create(createObservacioneDto);
  }

  @Get()
  findAll() {
    return this.observacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.observacionesService.findOne(id);
  }

  @Get('/maquina/:maquina')
  findMaquina(@Param('maquina') maquina: number) {
    return this.observacionesService.findMaquina(maquina)
  }

  @Get('/maquinaN/:nombre')
  findMaquinaNombre(@Param('nombre') nombre: string) {
    return this.observacionesService.findMaquinaNombre(nombre)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateObservacioneDto: UpdateObservacioneDto) {
    return this.observacionesService.update(id, updateObservacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.observacionesService.remove(id);
  }
}
