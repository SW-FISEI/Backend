import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Aula } from './entities/aula.entity';
import { Like, Repository } from 'typeorm';
import { Caracteristica } from 'src/caracteristicas/entities/caracteristica.entity';
import { Piso } from 'src/pisos/entities/piso.entity';

@Injectable()
export class AulasService {

  constructor(
    @InjectRepository(Aula) private aulaRespository: Repository<Aula>,
    @InjectRepository(Caracteristica) private caracteristicaRepository: Repository<Caracteristica>,
    @InjectRepository(Piso) private pisoRepository: Repository<Piso>
  ) { }

  async create(createAulaDto: CreateAulaDto) {
    const { caracteristica, piso, ...rest } = createAulaDto;
    const caracteristicaE = await this.caracteristicaRepository.findOne({
      where: {
        id: caracteristica
      }
    })
    if (!caracteristicaE) throw new HttpException(`No se encontro la caracteristica`, HttpStatus.NOT_FOUND);

    const pisoE = await this.pisoRepository.findOne({
      where: {
        id: piso
      },
      relations: ['edificio']
    });
    if (!pisoE) throw new HttpException(`No se encontro el piso`, HttpStatus.NOT_FOUND)

    const aula = this.aulaRespository.create({
      ...rest,
      caracteristica: caracteristicaE,
      piso: pisoE
    });
    return await this.aulaRespository.save(aula);
  }

  async findAll() {
    return await this.aulaRespository.find({
      relations: ['piso', 'caracteristica']
    });
  }

  async findOne(id: number) {
    return await this.aulaRespository.findOne({
      where: {
        id: id
      },
      relations: ['piso', 'caracteristica']
    });
  }

  async findPiso(id: number) {
    return await this.aulaRespository.find({
      where: {
        piso: { id: id }
      },
      relations: ['piso', 'caracteristica']
    })
  }

  async findCaracteristica(id: number) {
    return await this.aulaRespository.find({
      where: {
        caracteristica: { id: id }
      },
      relations: ['piso', 'caracteristica']
    })
  }

  async findNombre(nombre: string) {
    return await this.aulaRespository.find({
      where: {
        nombre: Like(`%${nombre}%`)
      },
      relations: ['piso', 'caracteristica']
    })
  }

  async update(id: number, updateAulaDto: UpdateAulaDto) {
    const { caracteristica, piso, ...rest } = updateAulaDto;

    const caracteristicaE = await this.caracteristicaRepository.findOne({
      where: {
        id: caracteristica
      }
    })
    if (!caracteristicaE) throw new HttpException(`No se encontro la caracteristica`, HttpStatus.NOT_FOUND);

    const pisoE = await this.pisoRepository.findOne({
      where: {
        id: piso
      },
      relations: ['edificio']
    });
    if (!pisoE) throw new HttpException(`No se encontro el piso`, HttpStatus.NOT_FOUND)

    await this.aulaRespository.update({ id }, {
      ...rest,
      piso: pisoE,
      caracteristica: caracteristicaE
    });

    return await this.aulaRespository.findOne({
      where: {
        id: id
      },
      relations: ['piso', 'caracteristica']
    });
  }

  async remove(id: number) {
    return await this.aulaRespository.softDelete({ id });
  }
}
