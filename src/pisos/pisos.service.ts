import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePisoDto } from './dto/create-piso.dto';
import { UpdatePisoDto } from './dto/update-piso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Piso } from './entities/piso.entity';
import { Like, Repository } from 'typeorm';
import { Edificio } from 'src/edificios/entities/edificio.entity';

@Injectable()
export class PisosService {

  constructor(
    @InjectRepository(Piso) private pisoRepository: Repository<Piso>,
    @InjectRepository(Edificio) private edificioRepository: Repository<Edificio>) { }

  async create(createPisoDto: CreatePisoDto) {
    const { edificio, ...rest } = createPisoDto;

    const edificioE = await this.edificioRepository.findOne({ where: { id: edificio } })
    if (!edificioE) throw new HttpException(`No se encontro el edificio`, HttpStatus.NOT_FOUND);

    const piso = this.pisoRepository.create({
      ...rest,
      edificio: edificioE
    })

    return await this.pisoRepository.save(piso);
  }

  async findAll() {
    return await this.pisoRepository.find({
      relations: ['edificio', 'aula']
    });
  }

  async findOne(id: number) {
    return await this.pisoRepository.findOne({
      where: {
        id: id
      },
      relations: ['edificio', 'aula']
    });
  }

  async findName(nombre: string) {
    return await this.pisoRepository.findOne({
      where: {
        nombre: nombre
      },
      relations: ['edificio', 'aula']
    });
  }

  async findNameByKey(nombre: string) {
    try {
      if (!nombre || typeof nombre !== 'string') throw new HttpException(`No se encontor el piso`, HttpStatus.NOT_FOUND);

      const pisos = this.pisoRepository.find({
        where: {
          nombre: Like(`%${nombre}%`)
        },
        relations: ['edificio', 'aula']
      })
      return pisos;
    } catch (error) {
      throw new HttpException(`Error Interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updatePisoDto: UpdatePisoDto) {
    const { edificio, ...rest } = updatePisoDto

    const piso = await this.pisoRepository.findOne({ where: { id: id } })
    if (!piso) throw new HttpException(`No se encontro el piso`, HttpStatus.NOT_FOUND);

    const edificioE = await this.edificioRepository.findOne({ where: { id: edificio } })
    if (!edificioE) throw new HttpException(`No se encontro el edificio`, HttpStatus.NOT_FOUND);

    await this.pisoRepository.update({ id },
      {
        ...rest,
        edificio: edificioE
      });

    return await this.pisoRepository.findOne({
      where: { id },
      relations: ['edificio', 'aula']
    });
  }

  async remove(id: number) {
    return await this.pisoRepository.softDelete({ id });
  }
}
