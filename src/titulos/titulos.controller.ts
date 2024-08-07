import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TitulosService } from './titulos.service';
import { CreateTituloDto } from './dto/create-titulo.dto';
import { UpdateTituloDto } from './dto/update-titulo.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enum/rol.enum';

@Auth(Rol.USER)
@Controller('titulos')
export class TitulosController {
  constructor(private readonly titulosService: TitulosService) { }

  @Post()
  create(@Body() createTituloDto: CreateTituloDto) {
    return this.titulosService.create(createTituloDto);
  }

  @Get()
  findAll() {
    return this.titulosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.titulosService.findOne(id);
  }

  @Get('nombre/:nombre')
  findOneByName(@Param('nombre') nombre: string) {
    return this.titulosService.findOneByName(nombre);
  }

  @Get('abreviacion/:abreviacion')
  fifindOneByAbreviationndOne(@Param('abreviacion') abreviacion: string) {
    return this.titulosService.findOneByAbreviation(abreviacion);
  }

  @Get('nombre/key/:nombre')
  findOneByNameKey(@Param('nombre') nombre: string) {
    return this.titulosService.findOneByNameKey(nombre);
  }

  @Get('abreviacion/key/:abreviacion')
  findOneByAbreviationKey(@Param('abreviacion') abreviacion: string) {
    return this.titulosService.findOneByAbreviationKey(abreviacion);
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
