import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AulasService } from './aulas.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enum/rol.enum';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

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

  @Get('/piso/:piso')
  findPiso(@Param('piso') piso: number) {
    return this.aulasService.findPiso(piso);
  }

  @Get('/caracteristica/:caracteristica')
  findCaracteristica(@Param('caracteristica') caracteristica: number) {
    return this.aulasService.findCaracteristica(caracteristica);
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
