import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaracteristicasService } from './caracteristicas.service';
import { CreateCaracteristicaDto } from './dto/create-caracteristica.dto';
import { UpdateCaracteristicaDto } from './dto/update-caracteristica.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enum/rol.enum';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Caracteristicas')
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@ApiBearerAuth()
@Auth(Rol.USER)
@Controller('caracteristicas')
export class CaracteristicasController {
  constructor(private readonly caracteristicasService: CaracteristicasService) { }

  @Post()
  create(@Body() createCaracteristicaDto: CreateCaracteristicaDto) {
    return this.caracteristicasService.create(createCaracteristicaDto);
  }

  @Get()
  findAll() {
    return this.caracteristicasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.caracteristicasService.findOne(id);
  }

  @Get('/cantidad_pc/:cantidad_pc')
  findOnePC(@Param('cantidad_pc') cantidad_pc: number) {
    return this.caracteristicasService.findOnePC(cantidad_pc);
  }

  @Get('/capacidad/:capacidad')
  findOneCapacity(@Param('capacidad') capacidad: number) {
    return this.caracteristicasService.findOneCapacity(capacidad);
  }

  @Get('/proyector/:proyector')
  findOneProjector(@Param('proyector') proyector: boolean) {
    return this.caracteristicasService.findOneProyector(proyector);
  }

  @Get('/aire/:aire')
  findOneAir(@Param('aire') aire: boolean) {
    return this.caracteristicasService.findOneAir(aire);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCaracteristicaDto: UpdateCaracteristicaDto) {
    return this.caracteristicasService.update(id, updateCaracteristicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.caracteristicasService.remove(id);
  }
}
