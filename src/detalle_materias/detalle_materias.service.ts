import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDetalleMateriaDto } from './dto/create-detalle_materia.dto';
import { UpdateDetalleMateriaDto } from './dto/update-detalle_materia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleMateria } from './entities/detalle_materia.entity';
import { Repository } from 'typeorm';
import { Carrera } from 'src/carreras/entities/carrera.entity';
import { Semestre } from 'src/semestres/entities/semestre.entity';
import { Materia } from 'src/materias/entities/materia.entity';
import { Paralelo } from 'src/paralelos/entities/paralelo.entity';

@Injectable()
export class DetalleMateriasService {

  constructor(
    @InjectRepository(DetalleMateria) private detalleMateriaRepository: Repository<DetalleMateria>,
    @InjectRepository(Carrera) private carreraRepository: Repository<Carrera>,
    @InjectRepository(Semestre) private semestreRepository: Repository<Semestre>,
    @InjectRepository(Materia) private materiaRepository: Repository<Materia>,
    @InjectRepository(Paralelo) private paraleloRepository: Repository<Paralelo>
  ) { }

  async create(createDetalleMateriaDto: CreateDetalleMateriaDto) {
    const { carrera, semestre, materia, paralelo, ...rest } = createDetalleMateriaDto;

    const carreraE = await this.carreraRepository.findOne({
      where: {
        id: carrera
      }
    });
    if (!carreraE) throw new HttpException(`No se encontro la carrera`, HttpStatus.NOT_FOUND);

    const semestreE = await this.semestreRepository.findOne({
      where: {
        id: semestre
      }
    });
    if (!semestreE) throw new HttpException(`No se encontor el semestre`, HttpStatus.NOT_FOUND);

    const materiaE = await this.materiaRepository.findOne({
      where: {
        id: materia
      }
    });
    if (!materiaE) throw new HttpException(`No se encontro la materia`, HttpStatus.NOT_FOUND);

    const paraleloE = await this.paraleloRepository.findOne({
      where: {
        id: paralelo
      }
    });
    if (!paraleloE) throw new HttpException(`No se encontor el paralelo`, HttpStatus.NOT_FOUND);

    const detalle_materia = this.detalleMateriaRepository.create({
      ...rest,
      carrera: carreraE,
      semestre: semestreE,
      materia: materiaE,
      paralelo: paraleloE
    });
    return await this.detalleMateriaRepository.save(detalle_materia);
  }

  async findAll() {
    return await this.detalleMateriaRepository.find({
      relations: ['carrera', 'semestre', 'materia', 'paralelo']
    });
  }

  async findOne(id: number) {
    return await this.detalleMateriaRepository.findOne({
      where: {
        id: id
      },
      relations: ['carrera', 'semestre', 'materia', 'paralelo']
    });
  }

  async findCarrera(carrera: number) {
    return await this.detalleMateriaRepository.find({
      where: {
        carrera: { id: carrera }
      },
      relations: ['carrera', 'semestre', 'materia', 'paralelo']
    })
  }

  async findSemestre(semestre: number) {
    return await this.detalleMateriaRepository.find({
      where: {
        semestre: { id: semestre }
      },
      relations: ['carrera', 'semestre', 'materia', 'paralelo']
    })
  }

  async findMateria(materia: number) {
    return await this.detalleMateriaRepository.find({
      where: {
        materia: { id: materia }
      },
      relations: ['carrera', 'semestre', 'materia', 'paralelo']
    })
  }

  async findParalelo(paralelo: number) {
    return await this.detalleMateriaRepository.find({
      where: {
        paralelo: { id: paralelo }
      },
      relations: ['carrera', 'semestre', 'materia', 'paralelo']
    })
  }

  async update(id: number, updateDetalleMateriaDto: UpdateDetalleMateriaDto) {
    const { carrera, semestre, materia, paralelo, ...rest } = updateDetalleMateriaDto;

    const detalle_materiaE = this.detalleMateriaRepository.findOne({
      where: {
        id: id
      }
    });
    if (!detalle_materiaE) throw new HttpException(`No se encontor el detalle`, HttpStatus.NOT_FOUND);

    const carreraE = await this.carreraRepository.findOne({
      where: {
        id: carrera
      }
    });
    if (!carreraE) throw new HttpException(`No se encontro la carrera`, HttpStatus.NOT_FOUND);

    const semestreE = await this.semestreRepository.findOne({
      where: {
        id: semestre
      }
    });
    if (!semestreE) throw new HttpException(`No se encontor el semestre`, HttpStatus.NOT_FOUND);

    const materiaE = await this.materiaRepository.findOne({
      where: {
        id: materia
      }
    });
    if (!materiaE) throw new HttpException(`No se encontro la materia`, HttpStatus.NOT_FOUND);

    const paraleloE = await this.paraleloRepository.findOne({
      where: {
        id: paralelo
      }
    });
    if (!paraleloE) throw new HttpException(`No se encontor el paralelo`, HttpStatus.NOT_FOUND);

    await this.detalleMateriaRepository.update({ id }, {
      ...rest,
      carrera: carreraE,
      semestre: semestreE,
      materia: materiaE,
      paralelo: paraleloE
    })
    return await this.detalleMateriaRepository.findOne({
      where: {
        id: id
      },
      relations: ['carrera', 'semestre', 'materia', 'paralelo']
    });
  }

  async remove(id: number) {
    return await this.detalleMateriaRepository.softDelete({ id });
  }
}
