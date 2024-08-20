import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Aula } from './entities/aula.entity';
import { Like, Repository } from 'typeorm';
import { Caracteristicas } from 'src/common/enum/caracteristicas.enum';
import { DetallePiso } from 'src/detalle_pisos/entities/detalle_piso.entity';

@Injectable()
export class AulasService {

  constructor(
    @InjectRepository(Aula) private aulaRespository: Repository<Aula>,
    @InjectRepository(DetallePiso) private detallePisoRepository: Repository<DetallePiso>
  ) { }

  async create(createAulaDto: CreateAulaDto) {
    const { detalle_piso, ...rest } = createAulaDto;

    const pisoE = await this.detallePisoRepository.findOne({
      where: {
        id: detalle_piso
      },
      relations: ['piso', 'edificio']
    });
    if (!pisoE) throw new HttpException(`No se encontro el detalle piso`, HttpStatus.NOT_FOUND)

    const aula = this.aulaRespository.create({
      ...rest,
      detalle_piso: pisoE
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
            detalle_piso: {
              piso: {
                nombre: true
              },
              edificio: {
                nombre: true
              }
            }
          },
          relations: ['detalle_piso.piso', 'detalle_piso.edificio']
        });
      } else {
        return await this.aulaRespository.find({
          relations: ['detalle_piso.piso', 'detalle_piso.edificio']
        })
      }
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findPiso(id: number) {
    return await this.aulaRespository.find({
      where: {
        detalle_piso: { id: id }
      },
      relations: ['detalle_piso.piso', 'detalle_piso.edificio']
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
        detalle_piso: {
          piso: {
            nombre: true
          },
          edificio: {
            nombre: true
          }
        }
      },
      relations: ['detalle_piso.piso', 'detalle_piso.edificio']
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
    const { detalle_piso, ...rest } = updateAulaDto;

    const pisoE = await this.detallePisoRepository.findOne({
      where: {
        id: detalle_piso
      },
      relations: ['detalle_piso.piso', 'detalle_piso.edificio']
    });
    if (!pisoE) throw new HttpException(`No se encontro el piso`, HttpStatus.NOT_FOUND)

    await this.aulaRespository.update({ id }, {
      ...rest,
      detalle_piso: pisoE
    });

    return await this.aulaRespository.findOne({
      where: {
        id: id
      },
      relations: ['detalle_piso.piso', 'detalle_piso.edificio']
    });
  }

  async remove(id: number) {
    return await this.aulaRespository.softDelete({ id });
  }
}
