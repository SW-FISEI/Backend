import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTituloDto } from './dto/create-titulo.dto';
import { UpdateTituloDto } from './dto/update-titulo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Titulo } from './entities/titulo.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TitulosService {

  constructor(@InjectRepository(Titulo) private tituloRepository: Repository<Titulo>) { }

  async create(createTituloDto: CreateTituloDto) {
    const titulo = this.tituloRepository.create(createTituloDto);
    return await this.tituloRepository.save(titulo);
  }

  async findOne(id: number) {
    return await this.tituloRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findTitulos(nombre?: string) {
    try {
      if (nombre && typeof nombre === "string") {
        return await this.tituloRepository.find({
          where: {
            nombre: Like(`%${nombre}%`)
          }
        });
      } else {
        return await this.tituloRepository.find();
      }
    } catch (error) {
        throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAbreviacion(abreviacion?: string) {
    try {
      if (abreviacion && typeof abreviacion === "string") {
        return await this.tituloRepository.find({
          where: {
            abreviacion: Like(`%${abreviacion}%`)
          }
        });
      } else {
        return await this.tituloRepository.find();
      }
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateTituloDto: UpdateTituloDto) {
    return await this.tituloRepository.update({ id }, updateTituloDto);
  }

  async remove(id: number) {
    return await this.tituloRepository.softDelete({ id });
  }
}
