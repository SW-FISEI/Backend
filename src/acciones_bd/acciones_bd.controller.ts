import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccionesBdService } from './acciones_bd.service';
import { CreateAccionesBdDto } from './dto/create-acciones_bd.dto';
import { UpdateAccionesBdDto } from './dto/update-acciones_bd.dto';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Acciones-BD')
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@ApiBearerAuth()
@Controller('acciones-bd')
export class AccionesBdController {
  constructor(private readonly accionesBdService: AccionesBdService) {}

  @Post()
  create(@Body() createAccionesBdDto: CreateAccionesBdDto) {
    return this.accionesBdService.create(createAccionesBdDto);
  }

  @Get()
  findAll() {
    return this.accionesBdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accionesBdService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccionesBdDto: UpdateAccionesBdDto) {
    return this.accionesBdService.update(+id, updateAccionesBdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accionesBdService.remove(+id);
  }
}
