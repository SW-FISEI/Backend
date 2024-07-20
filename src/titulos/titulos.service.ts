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

  async findAll() {
    return await this.tituloRepository.find();
  }

  async findOne(id: number) {
    return await this.tituloRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findOneByName(nombre: string) {
    return await this.tituloRepository.findOne({
      where: {
        nombre: nombre
      }
    });
  }

  async findOneByAbreviation(abreviacion: string) {
    return await this.tituloRepository.findOne({
      where: {
        abreviacion: abreviacion
      }
    });
  }

  async findOneByNameKey(nombre: string) {
    try {
      if (!nombre || typeof nombre !== "string") throw new HttpException(`No se encontro el titulo`, HttpStatus.NOT_FOUND);
      const titulo = this.tituloRepository.find({
        where: {
          nombre: Like(`%${nombre}%`)
        }
      })
      return titulo;
    } catch (error) {
      throw new HttpException(`Errorinterno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneByAbreviationKey(abreviacion: string) {
    try {
      if (!abreviacion || typeof abreviacion !== "string") throw new HttpException(`No se encontro el titulo`, HttpStatus.NOT_FOUND);
      const titulo = this.tituloRepository.find({
        where: {
          abreviacion: Like(`%${abreviacion}%`)
        }
      })
      return titulo;
    } catch (error) {
      throw new HttpException(`Errorinterno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateTituloDto: UpdateTituloDto) {
    return await this.tituloRepository.update({ id }, updateTituloDto);
  }

  async remove(id: number) {
    return await this.tituloRepository.softDelete({ id });
  }
}
