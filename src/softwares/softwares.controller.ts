import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SoftwaresService } from './softwares.service';
import { CreateSoftwareDto } from './dto/create-software.dto';
import { UpdateSoftwareDto } from './dto/update-software.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enum/rol.enum';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Software')
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@ApiBearerAuth()
@Auth(Rol.USER)
@Controller('softwares')
export class SoftwaresController {
  constructor(private readonly softwaresService: SoftwaresService) { }

  @Post()
  create(@Body() createSoftwareDto: CreateSoftwareDto) {
    return this.softwaresService.create(createSoftwareDto);
  }

  @Get()
  findAll() {
    return this.softwaresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.softwaresService.findOne(id);
  }

  @Get('nombre/:nombre')
  findOneByName(@Param('nombre') nombre: string) {
    return this.softwaresService.findOneByName(nombre);
  }

  /* BUSQUEDA POR KEY COMO BODY */
  @Post('search')
  findOneByKey(@Body('nombre') nombre: string) {
    return this.softwaresService.findOneByKey(nombre);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSoftwareDto: UpdateSoftwareDto) {
    return this.softwaresService.update(id, updateSoftwareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.softwaresService.remove(id);
  }
}
