import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EdificiosService } from './edificios.service';
import { CreateEdificioDto } from './dto/create-edificio.dto';
import { UpdateEdificioDto } from './dto/update-edificio.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enum/rol.enum';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Edificios')
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@ApiBearerAuth()
@Auth(Rol.USER)
@Controller('edificios')
export class EdificiosController {
  constructor(private readonly edificiosService: EdificiosService) { }

  @Post()
  create(@Body() createEdificioDto: CreateEdificioDto) {
    return this.edificiosService.create(createEdificioDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.edificiosService.findOne(id);
  }

  @Post('buscar')
  findEdificio(@Body() body: { nombre?: string }) {
    const { nombre } = body;
    return this.edificiosService.findEdificio(nombre);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEdificioDto: UpdateEdificioDto) {
    return this.edificiosService.update(id, updateEdificioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.edificiosService.remove(id);
  }
}
