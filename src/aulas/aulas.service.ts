import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Aula } from './entities/aula.entity';
import { Like, Repository } from 'typeorm';
import { Piso } from 'src/pisos/entities/piso.entity';
import { Caracteristicas } from 'src/common/enum/caracteristicas.enum';

@Injectable()
export class AulasService {

  constructor(
    @InjectRepository(Aula) private aulaRespository: Repository<Aula>,
    @InjectRepository(Piso) private pisoRepository: Repository<Piso>
  ) { }

  async create(createAulaDto: CreateAulaDto) {
    const { piso, ...rest } = createAulaDto;

    const pisoE = await this.pisoRepository.findOne({
      where: {
        id: piso
      },
      relations: ['edificio']
    });
    if (!pisoE) throw new HttpException(`No se encontro el piso`, HttpStatus.NOT_FOUND)

    const aula = this.aulaRespository.create({
      ...rest,
      piso: pisoE
    });
    return await this.aulaRespository.save(aula);
  }

  async findAula(nombre?: string) {
    try {
      if (nombre && typeof nombre === "string") {
        return await this.aulaRespository.find({
          where: {
            nombre: Like(`%${nombre}%`)
          },
          select: {
            id: true,
            nombre: true,
            cantidad_pc: true,
            capacidad: true,
            proyector: true,
            aire: true,
            descripcion: true,
            piso: {
              nombre: true,
              edificio: {
                nombre: true
              }
            }
          },
          relations: ['piso', 'piso.edificio']
        });
      } else {
        return await this.aulaRespository.find({
          relations: ['piso', 'piso.edificio']
        })
      }
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findPiso(id: number) {
    return await this.aulaRespository.find({
      where: {
        piso: { id: id }
      },
      relations: ['piso', 'edificio']
    })
  }

  async findOne(id: number) {
    return await this.aulaRespository.findOne({
      where: {
        id: id
      },
      select: {
        id: true,
        nombre: true,
        cantidad_pc: true,
        capacidad: true,
        proyector: true,
        aire: true,
        descripcion: true,
        piso: {
          nombre: true,
          edificio: {
            nombre: true
          }
        }
      },
      relations: ['piso', 'piso.edificio']
    });
  }

  async findPC(cantidad_pc: number) {
    return await this.aulaRespository.find({
      where: {
        cantidad_pc: cantidad_pc
      }
    });
  }

  async findCapacity(capacidad: number) {
    return await this.aulaRespository.find({
      where: {
        capacidad: capacidad
      }
    });
  }

  async findProyector(proyector: Caracteristicas) {
    return await this.aulaRespository.find({
      where: {
        proyector: proyector
      }
    });
  }

  async findAir(aire: Caracteristicas) {
    return await this.aulaRespository.find({
      where: {
        aire: aire
      }
    });
  }

  async update(id: number, updateAulaDto: UpdateAulaDto) {
    const { piso, ...rest } = updateAulaDto;

    const pisoE = await this.pisoRepository.findOne({
      where: {
        id: piso
      },
      relations: ['piso', 'edificio']
    });
    if (!pisoE) throw new HttpException(`No se encontro el piso`, HttpStatus.NOT_FOUND)

    await this.aulaRespository.update({ id }, {
      ...rest,
      piso: pisoE
    });

    return await this.aulaRespository.findOne({
      where: {
        id: id
      },
      relations: ['piso', 'edificio']
    });
  }

  async remove(id: number) {
    return await this.aulaRespository.softDelete({ id });
  }
}
