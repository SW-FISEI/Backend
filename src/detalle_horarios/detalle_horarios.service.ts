import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDetalleHorarioDto } from './dto/create-detalle_horario.dto';
import { UpdateDetalleHorarioDto } from './dto/update-detalle_horario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleHorario } from './entities/detalle_horario.entity';
import { Repository } from 'typeorm';
import { DetalleMateria } from 'src/detalle_materias/entities/detalle_materia.entity';
import { Horario } from 'src/horarios/entities/horario.entity';
import { Aula } from 'src/aulas/entities/aula.entity';
import { Docente } from 'src/docentes/entities/docente.entity';

@Injectable()
export class DetalleHorariosService {

  constructor(
    @InjectRepository(DetalleHorario) private detalleHorarioRepository: Repository<DetalleHorario>,
    @InjectRepository(DetalleMateria) private detalleMateriaRepository: Repository<DetalleMateria>,
    @InjectRepository(Horario) private horarioRepository: Repository<Horario>,
    @InjectRepository(Aula) private aulaRepository: Repository<Aula>,
    @InjectRepository(Docente) private docenteRepository: Repository<Docente>
  ) { }

  async create(createDetalleHorarioDto: CreateDetalleHorarioDto) {
    const { aula, horario, materia, docente, ...rest } = createDetalleHorarioDto

    const aulaE = await this.aulaRepository.findOne({
      where: {
        id: aula
      }
    });
    if (!aulaE) throw new HttpException(`No se encontor el aula`, HttpStatus.NOT_FOUND);

    const horarioE = await this.horarioRepository.findOne({
      where: {
        id: horario
      }
    });
    if (!horarioE) throw new HttpException(`No se encontro el horario`, HttpStatus.NOT_FOUND);

    const materiaE = await this.detalleMateriaRepository.findOne({
      where: {
        id: materia
      }
    });
    if (!materiaE) throw new HttpException(`No se encontro la materia`, HttpStatus.NOT_FOUND);

    const docenteE = await this.docenteRepository.findOne({
      where: {
        cedula: docente
      }
    });
    if (!docenteE) throw new HttpException(`No se encontor el docente`, HttpStatus.NOT_FOUND);

    const detalle_horario = this.detalleHorarioRepository.create({
      ...rest,
      aula: aulaE,
      horario: horarioE,
      materia: materiaE,
      docente: docenteE
    });
    return await this.detalleHorarioRepository.save(detalle_horario);
  }

  async findAll() {
    return await this.detalleHorarioRepository.find({
      relations: ['aula', 'horario', 'materia', 'docente']
    });
  }

  async findOne(id: number) {
    return await this.detalleHorarioRepository.findOne({
      where: {
        id: id
      },
      relations: ['aula', 'horario', 'materia', 'docente']
    });
  }

  async findAula(aula: number) {
    return await this.detalleHorarioRepository.find({
      where: {
        aula: { id: aula }
      },
      relations: ['aula', 'horario', 'materia', 'docente']
    })
  }

  async findHorario(horario: number) {
    return await this.detalleHorarioRepository.find({
      where: {
        horario: { id: horario }
      },
      relations: ['aula', 'horario', 'materia', 'docente']
    })
  }

  async findMateria(materia: number) {
    return await this.detalleHorarioRepository.find({
      where: {
        materia: { id: materia }
      },
      relations: ['aula', 'horario', 'materia', 'docente']
    })
  }

  async findDocente(docente: string) {
    return await this.detalleHorarioRepository.find({
      where: {
        docente: { cedula: docente }
      },
      relations: ['aula', 'horario', 'materia', 'docente']
    })
  }

  async update(id: number, updateDetalleHorarioDto: UpdateDetalleHorarioDto) {
    const { aula, horario, materia, docente, ...rest } = updateDetalleHorarioDto;

    const aulaE = await this.aulaRepository.findOne({
      where: {
        id: aula
      }
    });
    if (!aulaE) throw new HttpException(`No se encontor el aula`, HttpStatus.NOT_FOUND);

    const horarioE = await this.horarioRepository.findOne({
      where: {
        id: horario
      }
    });
    if (!horarioE) throw new HttpException(`No se encontro el horario`, HttpStatus.NOT_FOUND);

    const materiaE = await this.detalleMateriaRepository.findOne({
      where: {
        id: materia
      }
    });
    if (!materiaE) throw new HttpException(`No se encontro la materia`, HttpStatus.NOT_FOUND);

    const docenteE = await this.docenteRepository.findOne({
      where: {
        cedula: docente
      }
    });
    if (!docenteE) throw new HttpException(`No se encontor el docente`, HttpStatus.NOT_FOUND);

    const detalle_horarioE = await this.detalleHorarioRepository.findOne({
      where: {
        id: id
      },
    })
    if (!detalle_horarioE) throw new HttpException(`No se enconor el detalle del horario`, HttpStatus.NOT_FOUND);

    await this.detalleHorarioRepository.update({ id },
      {
        ...rest,
        aula: aulaE,
        materia: materiaE,
        horario: horarioE,
        docente: docenteE
      }
    );
    return await this.detalleHorarioRepository.findOne({
      where: {
        id: id
      },
      relations: ['aula', 'horario', 'materia', 'docente']
    })
  }

  async remove(id: number) {
    return await this.detalleHorarioRepository.softDelete({ id });
  }
}
