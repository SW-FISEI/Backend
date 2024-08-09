import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SemestresService } from './semestres.service';
import { CreateSemestreDto } from './dto/create-semestre.dto';
import { UpdateSemestreDto } from './dto/update-semestre.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enum/rol.enum';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Semestres')
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@ApiBearerAuth()
@Auth(Rol.USER)
@Controller('semestres')
export class SemestresController {
  constructor(private readonly semestresService: SemestresService) { }

  @Post()
  create(@Body() createSemestreDto: CreateSemestreDto) {
    return this.semestresService.create(createSemestreDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.semestresService.findOne(id);
  }

  @Post('buscar')
  findSemestre(@Body() body: { nombre?: string }) {
    const { nombre } = body;
    return this.semestresService.findSemestre(nombre);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSemestreDto: UpdateSemestreDto) {
    return this.semestresService.update(id, updateSemestreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.semestresService.remove(id);
  }
}
