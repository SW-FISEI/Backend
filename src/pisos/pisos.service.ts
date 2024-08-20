import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePisoDto } from './dto/create-piso.dto';
import { UpdatePisoDto } from './dto/update-piso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Piso } from './entities/piso.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class PisosService {

  constructor(
    @InjectRepository(Piso) private pisoRepository: Repository<Piso>) { }

  async create(createPisoDto: CreatePisoDto) {
    const piso = this.pisoRepository.create(createPisoDto);
    return await this.pisoRepository.save(piso);
  }

  async findOne(id: number) {
    return await this.pisoRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findPiso(nombre?: string) {
    try {
      if (nombre && typeof nombre === "string") {
        return await this.pisoRepository.find({
          where: {
            nombre: Like(`%${nombre}%`)
          },
          select: {
            id: true,
            nombre: true,
          },
        })
      } else {
        return await this.pisoRepository.find();
      }
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /* async findAula(nombre?: string) {
    try {
      if (nombre && typeof nombre === "string") {
        return await this.pisoRepository.find({
          where: {
            aula: { nombre: Like(`%${nombre}%`) }
          },
          relations: ['edificio', 'aula']
        })
      } else {
        return await this.pisoRepository.find({
          relations: ['edificio', 'aula']
        });
      }
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  } */

  async update(id: number, updatePisoDto: UpdatePisoDto) {

    const piso = await this.pisoRepository.findOne({ where: { id: id } })
    if (!piso) throw new HttpException(`No se encontro el piso`, HttpStatus.NOT_FOUND);

    await this.pisoRepository.update({ id }, updatePisoDto);

    return await this.pisoRepository.findOne({
      where: { id }
    });
  }

  async remove(id: number) {
    return await this.pisoRepository.softDelete({ id });
  }
}
