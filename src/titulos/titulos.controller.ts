import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TitulosService } from './titulos.service';
import { CreateTituloDto } from './dto/create-titulo.dto';
import { UpdateTituloDto } from './dto/update-titulo.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enum/rol.enum';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Titulos')
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@ApiBearerAuth()
@Auth(Rol.USER)
@Controller('titulos')
export class TitulosController {
  constructor(private readonly titulosService: TitulosService) { }

  @Post()
  create(@Body() createTituloDto: CreateTituloDto) {
    return this.titulosService.create(createTituloDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.titulosService.findOne(id);
  }

  @Post('buscarT')
  findTitulos(@Body() body: { nombre?: string }) {
    const { nombre } = body;
    return this.titulosService.findTitulos(nombre);
  }

  @Post('buscarA')
  findAbreviacion(@Body() body: { abreviacion?: string }) {
    const { abreviacion } = body;
    return this.titulosService.findAbreviacion(abreviacion);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTituloDto: UpdateTituloDto) {
    return this.titulosService.update(id, updateTituloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.titulosService.remove(id);
  }
}
