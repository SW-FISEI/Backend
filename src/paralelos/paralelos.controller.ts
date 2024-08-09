import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParalelosService } from './paralelos.service';
import { CreateParaleloDto } from './dto/create-paralelo.dto';
import { UpdateParaleloDto } from './dto/update-paralelo.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enum/rol.enum';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Paralelos')
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@ApiBearerAuth()
@Auth(Rol.USER)
@Controller('paralelos')
export class ParalelosController {
  constructor(private readonly paralelosService: ParalelosService) { }

  @Post()
  create(@Body() createParaleloDto: CreateParaleloDto) {
    return this.paralelosService.create(createParaleloDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.paralelosService.findOne(id);
  }

  @Post('buscar')
  findParalelo(@Body() body: { nombre?: string }) {
    const { nombre } = body;
    return this.paralelosService.findParalelo(nombre);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateParaleloDto: UpdateParaleloDto) {
    return this.paralelosService.update(id, updateParaleloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.paralelosService.remove(id);
  }
}
