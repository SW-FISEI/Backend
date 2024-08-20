import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDetallePisoDto } from './dto/create-detalle_piso.dto';
import { UpdateDetallePisoDto } from './dto/update-detalle_piso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetallePiso } from './entities/detalle_piso.entity';
import { Like, Repository } from 'typeorm';
import { Piso } from 'src/pisos/entities/piso.entity';
import { Edificio } from 'src/edificios/entities/edificio.entity';

@Injectable()
export class DetallePisosService {

  constructor(
    @InjectRepository(DetallePiso) private detallePisoRepository: Repository<DetallePiso>,
    @InjectRepository(Piso) private pisoRepository: Repository<Piso>,
    @InjectRepository(Edificio) private edificioRepository: Repository<Edificio>) { }

  async create(createDetallePisoDto: CreateDetallePisoDto) {
    const { piso, edificio, ...rest } = createDetallePisoDto;

    const pisoE = await this.pisoRepository.findOne({
      where: {
        id: piso
      }
    });
    if (!pisoE) throw new HttpException(`No se encontro el piso`, HttpStatus.NOT_FOUND);

    const edificioE = await this.edificioRepository.findOne({
      where: {
        id: edificio
      }
    });
    if (!edificioE) throw new HttpException(`No se encontro el edificio`, HttpStatus.NOT_FOUND);

    const detalle_piso = this.detallePisoRepository.create({
      ...rest,
      piso: pisoE,
      edificio: edificioE
    });

    return await this.detallePisoRepository.save(detalle_piso);
  }

  async findAll() {
    return await this.detallePisoRepository.find({
      relations: ['piso', 'edificio', 'aula']
    });
  }

  async findByEdificioAndPiso(edificioId: number, pisoId: number) {
    return await this.detallePisoRepository.findOne({
      where: {
        edificio: { id: edificioId },
        piso: { id: pisoId }
      },
      relations: ['piso', 'edificio']
    });
  }

  async findPiso(nombre?: string) {
    try {
      if (nombre && typeof nombre === "string") {
        return await this.detallePisoRepository.find({
          where: {
            piso: {
              nombre: Like(`%${nombre}%`)
            }
          },
          relations: ['piso', 'edificio', 'aula']
        })
      } else {
        return await this.detallePisoRepository.find({
          relations: ['piso', 'edificio', 'aula']
        })
      }
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findEdificio(nombre?: string) {
    try {
      if (nombre && typeof nombre === "string") {
        return await this.detallePisoRepository.find({
          where: {
            edificio: {
              nombre: Like(`%${nombre}%`)
            }
          },
          relations: ['piso', 'edificio', 'aula']
        })
      } else {
        return await this.detallePisoRepository.find({
          relations: ['piso', 'edificio', 'aula']
        })
      }
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    return await this.detallePisoRepository.findOne({
      where: {
        id: id
      },
      relations: ['piso', 'edificio', 'aula']
    });
  }

  async update(id: number, updateDetallePisoDto: UpdateDetallePisoDto) {
    const { piso, edificio, ...rest } = updateDetallePisoDto;

    const pisoE = await this.pisoRepository.findOne({
      where: {
        id: piso
      }
    });
    if (!pisoE) throw new HttpException(`No se encontro el piso`, HttpStatus.NOT_FOUND);

    const edificioE = await this.edificioRepository.findOne({
      where: {
        id: edificio
      }
    });
    if (!edificioE) throw new HttpException(`No se encontro el edificio`, HttpStatus.NOT_FOUND);

    await this.detallePisoRepository.update({ id }, {
      ...rest,
      piso: pisoE,
      edificio: edificioE
    });

    return await this.detallePisoRepository.findOne({
      where: {
        id: id
      }
    })
  }

  async remove(id: number) {
    return await this.detallePisoRepository.softDelete({ id });
  }
}
