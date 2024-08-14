import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateObservacioneDto } from './dto/create-observacione.dto';
import { UpdateObservacioneDto } from './dto/update-observacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Observacione } from './entities/observacione.entity';
import { Maquina } from 'src/maquinas/entities/maquina.entity';
import { Aula } from 'src/aulas/entities/aula.entity';

@Injectable()
export class ObservacionesService {

  constructor(
    @InjectRepository(Observacione) private observacionRepository: Repository<Observacione>,
    @InjectRepository(Maquina) private maquinaRepository: Repository<Maquina>,
    @InjectRepository(Aula) private aulaRepository: Repository<Aula>) { }

  async create(createObservacioneDto: CreateObservacioneDto) {
    const { maquina, ...rest } = createObservacioneDto;

    const maquinaE = await this.maquinaRepository.findOne({
      where: {
        id: maquina
      }
    });
    if (!maquinaE) throw new HttpException(`No se encontro la maquina`, HttpStatus.NOT_FOUND);

    const observacion = this.observacionRepository.create({
      ...rest,
      maquina: maquinaE
    })
    return await this.observacionRepository.save(observacion);
  }

  async findObservacion(descripcion?: string) {
    try {
      if (descripcion && typeof descripcion === "string") {
        return await this.observacionRepository.find({
          where: {
            descripcion: Like(`%${descripcion}%`)
          }, select: {
            id: true,
            descripcion: true,
            maquina: {
              nombre: true,
              aula: {
                nombre: true,
                piso: {
                  nombre: true,
                  edificio: {
                    nombre: true,
                  }
                }
              },
            },
          },
          relations: ['maquina', 'maquina.aula', 'maquina.aula.piso', 'maquina.aula.piso.edificio']
        })
      } else {
        return await this.observacionRepository.find({
          relations: ['maquina', 'maquina.aula', 'maquina.aula.piso', 'maquina.aula.piso.edificio']
        })
      }
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    return await this.observacionRepository.findOne({
      where: {
        id: id
      },
      relations: ['maquina', 'maquina.aula']
    });
  }

  async findMaquinaId(maquina: number) {
    return await this.observacionRepository.find({
      where: {
        maquina: { id: maquina }
      },
      relations: ['maquina', 'maquina.aula']
    });
  }

  async findMaquinaNombre(nombre: string) {
    return await this.observacionRepository.find({
      where: {
        maquina: { nombre: nombre }
      },
      relations: ['maquina', 'maquina.aula']
    })
  }

  async update(id: number, updateObservacioneDto: UpdateObservacioneDto) {
    const { maquina, ...rest } = updateObservacioneDto;

    const maquinaE = await this.maquinaRepository.findOne({
      where: {
        id: maquina
      }
    });
    if (!maquinaE) throw new HttpException(`No se encontr la maquina`, HttpStatus.NOT_FOUND);

    await this.observacionRepository.update({ id }, {
      ...rest,
      maquina: maquinaE
    });
    return await this.observacionRepository.findOne({
      where: {
        id: id
      },
      relations: ['maquina']
    });
  }

  async remove(id: number) {
    return await this.observacionRepository.softDelete({ id });
  }
}
