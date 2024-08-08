import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HorariosService } from './horarios.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enum/rol.enum';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Horarios')
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@ApiBearerAuth()
@Auth(Rol.USER)
@Controller('horarios')
export class HorariosController {
  constructor(private readonly horariosService: HorariosService) { }

  @Post()
  create(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horariosService.create(createHorarioDto);
  }

  @Get()
  findAll() {
    return this.horariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.horariosService.findOne(id);
  }

  @Get('/periodo/:periodo')
  findByPerido(@Param('periodo') periodo: number) {
    return this.horariosService.findByPerido(periodo);
  }

  @Get('/numdia/:numero_dia')
  findNumeroDia(@Param('numero_dia') numero_dia: number) {
    return this.horariosService.findNumeroDia(numero_dia);
  }

  @Get('/dia/:dia')
  findDia(@Param('dia') dia: string) {
    return this.horariosService.findDia(dia);
  }

  @Get('/horaI/:inicio')
  findInicio(@Param('inicio') inicio: string) {
    return this.horariosService.findInicio(inicio);
  }

  @Get('/horaF/:fin')
  findFin(@Param('fin') fin: string) {
    return this.horariosService.findFin(fin);
  }


  @Patch(':id')
  update(@Param('id') id: number, @Body() updateHorarioDto: UpdateHorarioDto) {
    return this.horariosService.update(id, updateHorarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.horariosService.remove(id);
  }
}
