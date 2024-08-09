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

  async findOne(id: number) {
    return await this.paraleloRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findParalelo(nombre?: string) {
    try {
      if (nombre && typeof nombre === "string") {
        return await this.paraleloRepository.find({
          where: {
            nombre: Like(`%${nombre}%`)
          }
        });
      } else {
        return await this.paraleloRepository.find();
      }
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
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
