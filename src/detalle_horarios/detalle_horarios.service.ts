import { Injectable } from '@nestjs/common';
import { CreateDetalleHorarioDto } from './dto/create-detalle_horario.dto';
import { UpdateDetalleHorarioDto } from './dto/update-detalle_horario.dto';

@Injectable()
export class DetalleHorariosService {
  create(createDetalleHorarioDto: CreateDetalleHorarioDto) {
    return 'This action adds a new detalleHorario';
  }

  findAll() {
    return `This action returns all detalleHorarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleHorario`;
  }

  update(id: number, updateDetalleHorarioDto: UpdateDetalleHorarioDto) {
    return `This action updates a #${id} detalleHorario`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleHorario`;
  }
}
