import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SugerenciasService } from './sugerencias.service';
import { CreateSugerenciaDto } from './dto/create-sugerencia.dto';
import { UpdateSugerenciaDto } from './dto/update-sugerencia.dto';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Sugerencias')
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@ApiBearerAuth()
@Controller('sugerencias')
export class SugerenciasController {
  constructor(private readonly sugerenciasService: SugerenciasService) { }

  @Post()
  create(@Body() createSugerenciaDto: CreateSugerenciaDto) {
    return this.sugerenciasService.create(createSugerenciaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sugerenciasService.findOne(id);
  }

  @Post('buscar')
  findSugerencias(@Body() body: { sugerencia?: string }) {
    const { sugerencia } = body;
    return this.sugerenciasService.findSugerencia(sugerencia);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSugerenciaDto: UpdateSugerenciaDto) {
    return this.sugerenciasService.update(id, updateSugerenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sugerenciasService.remove(id);
  }
}
