import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePeriodoDto } from './dto/create-periodo.dto';
import { UpdatePeriodoDto } from './dto/update-periodo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Periodo } from './entities/periodo.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class PeriodosService {

  constructor(@InjectRepository(Periodo) private periodoRepository: Repository<Periodo>) { }

  async create(createPeriodoDto: CreatePeriodoDto) {
    const periodo = this.periodoRepository.create(createPeriodoDto);
    return await this.periodoRepository.save(periodo);
  }

  async findAll() {
    return await this.periodoRepository.find();
  }

  async findOne(id: number) {
    return await this.periodoRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findOneByName(nombre: string) {
    return await this.periodoRepository.findOne({
      where: {
        nombre: nombre
      }
    });
  }

  async findOneByStartMonth(inicioMes: string) {
    return await this.periodoRepository.findOne({
      where: {
        inicioMes: inicioMes
      }
    });
  }

  async findOneByStartYear(inicioAño: string) {
    return await this.periodoRepository.findOne({
      where: {
        inicioAño: inicioAño
      }
    });
  }

  async findOneByEndMonth(finMes: string) {
    return await this.periodoRepository.findOne({
      where: {
        finMes: finMes
      }
    });
  }

  async findOneByEndYear(finAño: string) {
    return await this.periodoRepository.findOne({
      where: {
        finAño: finAño
      }
    });
  }

  async findOneByKeyName(nombre: string) {
    try {
      if (!nombre || typeof nombre !== 'string') throw new HttpException(`No se encotro el periodo`, HttpStatus.NOT_FOUND);
      const periodo = this.periodoRepository.find({
        where: {
          nombre: Like(`%${nombre}%`)
        }
      })
      return periodo;
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updatePeriodoDto: UpdatePeriodoDto) {
    const periodo = this.periodoRepository.findOneBy({ id })
    if (!periodo) throw new HttpException(`No se encontro el periodo`, HttpStatus.NOT_FOUND);
    return await this.periodoRepository.update({ id }, updatePeriodoDto);
  }

  async remove(id: number) {
    return await this.periodoRepository.softDelete({ id });
  }
}
