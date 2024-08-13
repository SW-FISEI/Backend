import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AulasService } from './aulas.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enum/rol.enum';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Caracteristicas } from 'src/common/enum/caracteristicas.enum';

@ApiTags('Aulas')
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@ApiBearerAuth()
@Auth(Rol.USER)
@Controller('aulas')
export class AulasController {
  constructor(private readonly aulasService: AulasService) { }

  @Post()
  create(@Body() createAulaDto: CreateAulaDto) {
    return this.aulasService.create(createAulaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.aulasService.findOne(id);
  }

  @Post('buscar')
  findAula(@Body() body: { nombre?: string }) {
    const { nombre } = body;
    return this.aulasService.findAula(nombre)
  }

  @Get('/cantidad_pc/:cantidad_pc')
  findPC(@Param('cantidad_pc') cantidad_pc: number) {
    return this.aulasService.findPC(cantidad_pc);
  }

  @Get('/capacidad/:capacidad')
  findCapacity(@Param('capacidad') capacidad: number) {
    return this.aulasService.findCapacity(capacidad);
  }

  @Get('/proyector/:proyector')
  findProyector(@Param('proyector') proyector: Caracteristicas) {
    return this.aulasService.findProyector(proyector);
  }

  @Get('/aire/:aire')
  findAir(@Param('aire') aire: Caracteristicas) {
    return this.aulasService.findAir(aire);
  }

  @Get('/piso/:piso')
  findPiso(@Param('piso') piso: number) {
    return this.aulasService.findPiso(piso);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAulaDto: UpdateAulaDto) {
    return this.aulasService.update(id, updateAulaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.aulasService.remove(id);
  }
}
