import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enum/rol.enum';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Materias')
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@ApiBearerAuth()
@Auth(Rol.USER)
@Controller('materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) { }

  @Post()
  create(@Body() createMateriaDto: CreateMateriaDto) {
    return this.materiasService.create(createMateriaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.materiasService.findOne(id);
  }

  @Post('buscar')
  findMateria(@Body() body: { nombre?: string }) {
    const { nombre } = body;
    return this.materiasService.findMateria(nombre)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMateriaDto: UpdateMateriaDto) {
    return this.materiasService.update(id, updateMateriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.materiasService.remove(id);
  }
}
