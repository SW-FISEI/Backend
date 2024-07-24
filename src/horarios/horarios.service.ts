import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Horario } from './entities/horario.entity';
import { Repository } from 'typeorm';
import { Periodo } from 'src/periodos/entities/periodo.entity';

@Injectable()
export class HorariosService {

  constructor(
    @InjectRepository(Horario) private horarioRepository: Repository<Horario>,
    @InjectRepository(Periodo) private periodoRepository: Repository<Periodo>
  ) { }

  async create(createHorarioDto: CreateHorarioDto) {
    const { periodo, ...rest } = createHorarioDto

    const periodoE = await this.periodoRepository.findOne({
      where: {
        id: periodo
      }
    });

    const horario = await this.horarioRepository.create({
      ...rest,
      periodo: periodoE
    })

    return await this.horarioRepository.save(horario);
  }

  async findAll() {
    return await this.horarioRepository.find({
      relations: ['periodo']
    });
  }

  async findOne(id: number) {
    return await this.horarioRepository.findOne({
      where: {
        id: id
      },
      relations: ['periodo']
    });
  }

  async findByPerido(periodo: number) {
    return await this.horarioRepository.find({
      where: {
        periodo: { id: periodo }
      },
      relations: ['periodo']
    })
  }

  async findNumeroDia(numero_dia: number) {
    return await this.horarioRepository.find({
      where: {
        numero_dia: numero_dia
      },
      relations: ['periodo']
    })
  }

  async findDia(dia: string) {
    return await this.horarioRepository.find({
      where: {
        dia: dia
      },
      relations: ['periodo']
    })
  }

  async findInicio(inicio: string) {
    return await this.horarioRepository.find({
      where: {
        inicio: inicio
      },
      relations: ['periodo']
    })
  }

  async findFin(fin: string) {
    return await this.horarioRepository.find({
      where: {
        fin: fin
      },
      relations: ['periodo']
    })
  }

  async update(id: number, updateHorarioDto: UpdateHorarioDto) {
    const { periodo, ...rest } = updateHorarioDto

    const horario = this.horarioRepository.findOne({ where: { id: id } })
    if (!horario) throw new HttpException(`No se encontor el horario`, HttpStatus.NOT_FOUND)

    const periodoE = await this.periodoRepository.findOne({ where: { id: periodo } })
    if (!periodoE) throw new HttpException(`No se encontro el periodo`, HttpStatus.NOT_FOUND)

    await this.horarioRepository.update({ id },
      {
        ...rest,
        periodo: periodoE
      });

    return await this.horarioRepository.findOne({
      where: { id },
      relations: ['periodo']
    });
  }

  async remove(id: number) {
    return await this.horarioRepository.softDelete({ id });
  }
}
