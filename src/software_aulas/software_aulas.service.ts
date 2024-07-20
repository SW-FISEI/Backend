import { Injectable } from '@nestjs/common';
import { CreateSoftwareAulaDto } from './dto/create-software_aula.dto';
import { UpdateSoftwareAulaDto } from './dto/update-software_aula.dto';

@Injectable()
export class SoftwareAulasService {
  create(createSoftwareAulaDto: CreateSoftwareAulaDto) {
    return 'This action adds a new softwareAula';
  }

  findAll() {
    return `This action returns all softwareAulas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} softwareAula`;
  }

  update(id: number, updateSoftwareAulaDto: UpdateSoftwareAulaDto) {
    return `This action updates a #${id} softwareAula`;
  }

  remove(id: number) {
    return `This action removes a #${id} softwareAula`;
  }
}
