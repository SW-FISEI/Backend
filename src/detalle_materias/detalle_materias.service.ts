import { Injectable } from '@nestjs/common';
import { CreateDetalleMateriaDto } from './dto/create-detalle_materia.dto';
import { UpdateDetalleMateriaDto } from './dto/update-detalle_materia.dto';

@Injectable()
export class DetalleMateriasService {
  create(createDetalleMateriaDto: CreateDetalleMateriaDto) {
    return 'This action adds a new detalleMateria';
  }

  findAll() {
    return `This action returns all detalleMaterias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleMateria`;
  }

  update(id: number, updateDetalleMateriaDto: UpdateDetalleMateriaDto) {
    return `This action updates a #${id} detalleMateria`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleMateria`;
  }
}
