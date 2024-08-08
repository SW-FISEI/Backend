import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enum/rol.enum';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Docentes')
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@ApiBearerAuth()
@Auth(Rol.USER)
@Controller('docentes')
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) { }

  @Post()
  create(@Body() createDocenteDto: CreateDocenteDto) {
    return this.docentesService.create(createDocenteDto);
  }

  @Get()
  findAll() {
    return this.docentesService.findAll();
  }

  @Get(':cedula')
  findOne(@Param('cedula') cedula: string) {
    return this.docentesService.findOne(cedula);
  }

  @Get('nombre/:nombre')
  findOneName(@Param('nombre') nombre: string) {
    return this.docentesService.findByKey(nombre);
  }

  @Post('/docente')
  async findName(@Body() body: { docente: string }) {
    const { docente } = body;
    return this.docentesService.findByKey(docente);
  }

  @Get('/titulo/:titulo')
  findTitle(@Param('titulo') titulo: number) {
    return this.docentesService.findTitle(titulo);
  }

  @Patch(':cedula')
  update(@Param('cedula') cedula: string, @Body() updateDocenteDto: UpdateDocenteDto) {
    return this.docentesService.update(cedula, updateDocenteDto);
  }

  @Delete(':cedula')
  remove(@Param('cedula') cedula: string) {
    return this.docentesService.remove(cedula);
  }
}
