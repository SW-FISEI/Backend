import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDetalleHorarioDto } from './dto/create-detalle_horario.dto';
import { UpdateDetalleHorarioDto } from './dto/update-detalle_horario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleHorario } from './entities/detalle_horario.entity';
import { Like, Repository } from 'typeorm';
import { DetalleMateria } from 'src/detalle_materias/entities/detalle_materia.entity';
import { Aula } from 'src/aulas/entities/aula.entity';
import { Docente } from 'src/docentes/entities/docente.entity';
import { Periodo } from 'src/periodos/entities/periodo.entity';

@Injectable()
export class DetalleHorariosService {

  constructor(
    @InjectRepository(DetalleHorario) private detalleHorarioRepository: Repository<DetalleHorario>,
    @InjectRepository(DetalleMateria) private detalleMateriaRepository: Repository<DetalleMateria>,
    @InjectRepository(Periodo) private periodoRepository: Repository<Periodo>,
    @InjectRepository(Aula) private aulaRepository: Repository<Aula>,
    @InjectRepository(Docente) private docenteRepository: Repository<Docente>
  ) { }

  async create(createDetalleHorarioDto: CreateDetalleHorarioDto) {
    const { periodo, aula, detalle_materia, docente, ...rest } = createDetalleHorarioDto

    const periodoE = await this.periodoRepository.findOne({
      where: {
        id: periodo
      }
    })
    if (!periodoE) throw new HttpException(`No se encontro el periodo`, HttpStatus.NOT_FOUND);

    const aulaE = await this.aulaRepository.findOne({
      where: {
        id: aula
      }
    });
    if (!aulaE) throw new HttpException(`No se encontor el aula`, HttpStatus.NOT_FOUND);

    const materiaE = await this.detalleMateriaRepository.findOne({
      where: {
        id: detalle_materia
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
      periodo: periodoE,
      aula: aulaE,
      materia: materiaE,
      docente: docenteE
    });
    return await this.detalleHorarioRepository.save(detalle_horario);
  }

  async findAll() {
    return await this.detalleHorarioRepository.find({
      relations: ['aula.detalle_piso.piso', 'aula.detalle_piso.edificio', 'periodo', 'materia', 'materia.materia', 'materia.carrera', 'materia.paralelo', 'materia.semestre', 'docente']
    });
  }

  async findOne(id: number) {
    return await this.detalleHorarioRepository.findOne({
      where: {
        id: id
      },
      relations: ['aula.detalle_piso.piso', 'aula.detalle_piso.edificio', 'periodo', 'materia', 'materia.materia', 'materia.carrera', 'materia.paralelo', 'materia.semestre', 'docente']
    });
  }

  async findEdificio(edificio?: string) {
    try {
      if (edificio && typeof edificio === "string") {
        return await this.detalleHorarioRepository.find({
          where: {
            aula: {
              detalle_piso: {
                edificio: {
                  nombre: Like(`%${edificio}%`)
                }
              }
            }
          },
          relations: ['aula.detalle_piso.piso', 'aula.detalle_piso.edificio', 'periodo', 'materia', 'materia.materia', 'materia.carrera', 'materia.paralelo', 'materia.semestre', 'docente']
        })
      } else {
        return await this.detalleHorarioRepository.find({
          relations: ['aula.detalle_piso.piso', 'aula.detalle_piso.edificio', 'periodo', 'materia', 'materia.materia', 'materia.carrera', 'materia.paralelo', 'materia.semestre', 'docente']
        })
      }
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAula(aula?: string) {
    try {
      if (aula && typeof aula === "string") {
        return await this.detalleHorarioRepository.find({
          where: {
            aula: Like(`%${aula}%`)
          },
          relations: ['aula.detalle_piso.piso', 'aula.detalle_piso.edificio', 'periodo', 'materia', 'materia.materia', 'materia.carrera', 'materia.paralelo', 'materia.semestre', 'docente']
        })
      } else {
        return await this.detalleHorarioRepository.find({
          relations: ['aula.detalle_piso.piso', 'aula.detalle_piso.edificio', 'periodo', 'materia', 'materia.materia', 'materia.carrera', 'materia.paralelo', 'materia.semestre', 'docente']
        })
      }
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findPeriodo(periodo: number) {
    return await this.detalleHorarioRepository.find({
      where: {
        periodo: { id: periodo }
      },
      relations: ['aula.detalle_piso.piso', 'aula.detalle_piso.edificio', 'periodo', 'materia', 'materia.materia', 'materia.carrera', 'materia.paralelo', 'materia.semestre', 'docente']
    })
  }

  async findMateria(materia: number) {
    return await this.detalleHorarioRepository.find({
      where: {
        materia: { id: materia }
      },
      relations: ['aula.detalle_piso.piso', 'aula.detalle_piso.edificio', 'periodo', 'materia', 'materia.materia', 'materia.carrera', 'materia.paralelo', 'materia.semestre', 'docente']
    })
  }

  async findDocente(docente: string) {
    return await this.detalleHorarioRepository.find({
      where: {
        docente: { cedula: docente }
      },
      relations: ['aula.detalle_piso.piso', 'aula.detalle_piso.edificio', 'periodo', 'materia', 'materia.materia', 'materia.carrera', 'materia.paralelo', 'materia.semestre', 'docente']
    })
  }

  async update(id: number, updateDetalleHorarioDto: UpdateDetalleHorarioDto) {
    const { periodo, aula, detalle_materia, docente, ...rest } = updateDetalleHorarioDto;

    const periodoE = await this.periodoRepository.findOne({
      where: {
        id: periodo
      }
    })
    if (!periodoE) throw new HttpException(`No se encontro el periodo`, HttpStatus.NOT_FOUND);

    const aulaE = await this.aulaRepository.findOne({
      where: {
        id: aula
      }
    });
    if (!aulaE) throw new HttpException(`No se encontor el aula`, HttpStatus.NOT_FOUND);

    const materiaE = await this.detalleMateriaRepository.findOne({
      where: {
        id: detalle_materia
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
        periodo: periodoE,
        aula: aulaE,
        materia: materiaE,
        docente: docenteE
      }
    );
    return await this.detalleHorarioRepository.findOne({
      where: {
        id: id
      },
      relations: ['aula.detalle_piso.piso', 'aula.detalle_piso.edificio', 'periodo', 'materia', 'materia.materia', 'materia.carrera', 'materia.paralelo', 'materia.semestre', 'docente']
    })
  }

  async remove(id: number) {
    return await this.detalleHorarioRepository.softDelete({ id });
  }
}
