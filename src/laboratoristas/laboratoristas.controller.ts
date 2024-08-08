import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LaboratoristasService } from './laboratoristas.service';
import { CreateLaboratoristaDto } from './dto/create-laboratorista.dto';
import { UpdateLaboratoristaDto } from './dto/update-laboratorista.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enum/rol.enum';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Laboratoristas')
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@ApiBearerAuth()
@Auth(Rol.ADMIN)
@Controller('laboratoristas')
export class LaboratoristasController {
  constructor(private readonly laboratoristasService: LaboratoristasService) { }

  @Post()
  create(@Body() createLaboratoristaDto: CreateLaboratoristaDto) {
    return this.laboratoristasService.create(createLaboratoristaDto);
  }

  @Get()
  findAll() {
    return this.laboratoristasService.findAll();
  }

  @Get(':cedula')
  findOne(@Param('cedula') cedula: string) {
    return this.laboratoristasService.findOne(cedula);
  }

  @Post('/laboratorista')
  async findName(@Body() body: { laboratorista: string }) {
    const { laboratorista } = body;
    return this.laboratoristasService.findByKey(laboratorista);
  }

  @Get('/titulo/:titulo')
  findTitle(@Param('titulo') titulo: number) {
    return this.laboratoristasService.findTitle(titulo);
  }

  @Get('/edificio/:edificio')
  findBuilding(@Param('edificio') edificio: number) {
    return this.laboratoristasService.findBuilding(edificio);
  }

  @Patch(':cedula')
  update(@Param('cedula') cedula: string, @Body() updateLaboratoristaDto: UpdateLaboratoristaDto) {
    return this.laboratoristasService.update(cedula, updateLaboratoristaDto);
  }

  @Delete(':cedula')
  remove(@Param('cedula') cedula: string) {
    return this.laboratoristasService.remove(cedula);
  }
}
