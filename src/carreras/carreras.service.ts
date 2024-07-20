import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrera } from './entities/carrera.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CarrerasService {

  constructor(@InjectRepository(Carrera) private carreraRepository: Repository<Carrera>) { }

  async create(createCarreraDto: CreateCarreraDto) {
    const carrera = this.carreraRepository.create(createCarreraDto);
    return await this.carreraRepository.save(carrera);
  }

  async findAll() {
    return await this.carreraRepository.find();
  }

  async findOne(id: number) {
    return await this.carreraRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findOneByName(nombre: string) {
    return await this.carreraRepository.findOne({
      where: {
        nombre: nombre
      }
    });
  }

  async findOneByKey(nombre: string) {
    try {
      if (!nombre || typeof nombre !== 'string') throw new HttpException(`No se encontor la carrera`, HttpStatus.NOT_FOUND);
      const carrera = this.carreraRepository.find({
        where: {
          nombre: Like(`%${nombre}%`)
        }
      })
      return carrera;
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateCarreraDto: UpdateCarreraDto) {
    const carrera = this.carreraRepository.findOneBy({ id });

    if (!carrera) throw new HttpException(`No se encontro la carrera`, HttpStatus.NOT_FOUND);

    return await this.carreraRepository.update({ id }, updateCarreraDto);
  }

  async remove(id: number) {
    return await this.carreraRepository.softDelete({ id });
  }
}
