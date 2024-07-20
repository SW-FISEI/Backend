import { Injectable } from '@nestjs/common';
import { CreateEdificioDto } from './dto/create-edificio.dto';
import { UpdateEdificioDto } from './dto/update-edificio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Edificio } from './entities/edificio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EdificiosService {

  constructor(@InjectRepository(Edificio) private edificioRepository: Repository<Edificio>) { }

  async create(createEdificioDto: CreateEdificioDto) {
    const edificio = this.edificioRepository.create(createEdificioDto)
    return await this.edificioRepository.save(edificio);
  }

  async findAll() {
    return await this.edificioRepository.find();
  }

  async findOne(id: number) {
    return await this.edificioRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findOneName(nombre: string) {
    return await this.edificioRepository.findOne({
      where: {
        nombre: nombre
      }
    });
  }

  async update(id: number, updateEdificioDto: UpdateEdificioDto) {
    return await this.edificioRepository.update({ id }, updateEdificioDto);
  }

  async remove(id: number) {
    return await this.edificioRepository.softDelete({ id });
  }
}
