import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaracteristicaDto } from './dto/create-caracteristica.dto';
import { UpdateCaracteristicaDto } from './dto/update-caracteristica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Caracteristica } from './entities/caracteristica.entity';
import { Repository } from 'typeorm';
import { Aula } from 'src/aulas/entities/aula.entity';

@Injectable()
export class CaracteristicasService {

  constructor(
    @InjectRepository(Caracteristica) private caracteristicaRepository: Repository<Caracteristica>,
    @InjectRepository(Aula) private aulaRepository: Repository<Aula>) { }

  async create(createCaracteristicaDto: CreateCaracteristicaDto) {
    const { aula, ...rest } = createCaracteristicaDto;
    const caracteristica = this.caracteristicaRepository.create({
      ...rest,
      aula: aula ? await this.aulaRepository.findOne({
        where: {
          id: aula
        }
      }) : null,
    });
    return await this.caracteristicaRepository.save(caracteristica);
  }

  async findAll() {
    return await this.caracteristicaRepository.find();
  }

  async findOne(id: number) {
    return await this.caracteristicaRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findOnePC(cantidad_pc: number) {
    return await this.caracteristicaRepository.findOne({
      where: {
        cantidad_pc: cantidad_pc
      }
    });
  }

  async findOneCapacity(capacidad: number) {
    return await this.caracteristicaRepository.findOne({
      where: {
        capacidad: capacidad
      }
    });
  }

  async findOneProyector(proyector: boolean) {
    return await this.caracteristicaRepository.findOne({
      where: {
        proyector: proyector
      }
    });
  }

  async findOneAir(aire: boolean) {
    return await this.caracteristicaRepository.findOne({
      where: {
        aire: aire
      }
    });
  }

  async update(id: number, updateCaracteristicaDto: UpdateCaracteristicaDto) {
    const { aula, ...rest } = updateCaracteristicaDto;

    const caracteristica = await this.caracteristicaRepository.findOne({
      where: {
        id: id
      }
    });
    if (!caracteristica) {
      throw new NotFoundException(`Caracteristica con ID ${id} no encontradas`);
    }

    const aulaEntity = aula ? await this.aulaRepository.findOne({ where: { id: aula } }) : null;

    Object.assign(caracteristica, rest, { aula: aulaEntity });

    return await this.caracteristicaRepository.save(caracteristica);
  }

  async remove(id: number) {
    return this.caracteristicaRepository.softDelete({ id });
  }
}
