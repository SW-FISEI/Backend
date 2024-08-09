import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrera } from './entities/carrera.entity';
import { Like, Repository } from 'typeorm';
import { NODATA } from 'dns';

@Injectable()
export class CarrerasService {

  constructor(@InjectRepository(Carrera) private carreraRepository: Repository<Carrera>) { }

  async create(createCarreraDto: CreateCarreraDto) {
    const carrera = this.carreraRepository.create(createCarreraDto);
    return await this.carreraRepository.save(carrera);
  }

  async findOne(id: number) {
    return await this.carreraRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findCarrera(nombre?: string) {
    try {
      if (nombre && typeof nombre === "string") {
        return await this.carreraRepository.find({
          where: {
            nombre: Like(`%${nombre}%`)
          }
        });
      } else {
        return await this.carreraRepository.find();
      }
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
