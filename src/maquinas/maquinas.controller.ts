import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaquinasService } from './maquinas.service';
import { CreateMaquinaDto } from './dto/create-maquina.dto';
import { UpdateMaquinaDto } from './dto/update-maquina.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enum/rol.enum';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Maquinas')
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@ApiBearerAuth()
@Auth(Rol.USER)
@Controller('maquinas')
export class MaquinasController {
  constructor(private readonly maquinasService: MaquinasService) { }

  @Post()
  create(@Body() createMaquinaDto: CreateMaquinaDto) {
    return this.maquinasService.create(createMaquinaDto);
  }

  @Get()
  findAll() {
    return this.maquinasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.maquinasService.findOne(id);
  }

  @Post('buscarM')
  findMaquina(@Body() body: { nombre?: string }) {
    const { nombre } = body;
    return this.maquinasService.findMaquina(nombre)
  }

  @Post('buscarA')
  findAula(@Body() body: { nombre?: string }) {
    const { nombre } = body;
    return this.maquinasService.findAula(nombre)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMaquinaDto: UpdateMaquinaDto) {
    return this.maquinasService.update(id, updateMaquinaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.maquinasService.remove(id);
  }
}
