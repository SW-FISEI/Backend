import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetallePisosService } from './detalle_pisos.service';
import { CreateDetallePisoDto } from './dto/create-detalle_piso.dto';
import { UpdateDetallePisoDto } from './dto/update-detalle_piso.dto';

@Controller('detalle-pisos')
export class DetallePisosController {
  constructor(private readonly detallePisosService: DetallePisosService) { }

  @Post()
  create(@Body() createDetallePisoDto: CreateDetallePisoDto) {
    return this.detallePisosService.create(createDetallePisoDto);
  }

  @Get()
  findAll() {
    return this.detallePisosService.findAll();
  }

  @Post('/buscarPorEdificioYPiso')
  findByEdificioAndPiso(@Body() body: { edificioId: number, pisoId: number }) {
    return this.detallePisosService.findByEdificioAndPiso(body.edificioId, body.pisoId);
  }

  @Post('/buscarP')
  findPiso(@Body() body: { nombre?: string }) {
    const { nombre } = body;
    return this.detallePisosService.findPiso(nombre);
  }

  @Post('/buscarE')
  findEdificio(@Body() body: { nombre?: string }) {
    const { nombre } = body;
    return this.detallePisosService.findEdificio(nombre);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallePisosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetallePisoDto: UpdateDetallePisoDto) {
    return this.detallePisosService.update(+id, updateDetallePisoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallePisosService.remove(+id);
  }
}
