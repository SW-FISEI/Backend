import { Injectable } from '@nestjs/common';
import { CreateLaboratoristaDto } from './dto/create-laboratorista.dto';
import { UpdateLaboratoristaDto } from './dto/update-laboratorista.dto';

@Injectable()
export class LaboratoristasService {
  create(createLaboratoristaDto: CreateLaboratoristaDto) {
    return 'This action adds a new laboratorista';
  }

  findAll() {
    return `This action returns all laboratoristas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} laboratorista`;
  }

  update(id: number, updateLaboratoristaDto: UpdateLaboratoristaDto) {
    return `This action updates a #${id} laboratorista`;
  }

  remove(id: number) {
    return `This action removes a #${id} laboratorista`;
  }
}
