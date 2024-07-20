import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateParaleloDto } from './dto/create-paralelo.dto';
import { UpdateParaleloDto } from './dto/update-paralelo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Paralelo } from './entities/paralelo.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ParalelosService {

  constructor(@InjectRepository(Paralelo) private paraleloRepository: Repository<Paralelo>) { }

  async create(createParaleloDto: CreateParaleloDto) {
    const paralelo = this.paraleloRepository.create(createParaleloDto);
    return await this.paraleloRepository.save(paralelo);
  }

  async findAll() {
    return await this.paraleloRepository.find();
  }

  async findOne(id: number) {
    return await this.paraleloRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findOneByName(nombre: string) {
    return await this.paraleloRepository.findOne({
      where: {
        nombre: nombre
      }
    });
  }

  async findOneByKey(nombre: string) {
    try {
      if (!nombre || typeof nombre !== 'string') throw new HttpException(`No se encontro el paralelo`, HttpStatus.NOT_FOUND);
      const paralelo = this.paraleloRepository.find({
        where: {
          nombre: Like(`%${nombre}%`)
        }
      })
      return paralelo;
    } catch (error) {

    }
  }

  async update(id: number, updateParaleloDto: UpdateParaleloDto) {
    const paralelo = this.paraleloRepository.findOneBy({ id })
    if (!paralelo) throw new HttpException(`No se encontro el semester`, HttpStatus.NOT_FOUND);
    return await this.paraleloRepository.update({ id }, updateParaleloDto);
  }

  async remove(id: number) {
    return this.paraleloRepository.softDelete({ id });
  }
}
