import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSemestreDto } from './dto/create-semestre.dto';
import { UpdateSemestreDto } from './dto/update-semestre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Semestre } from './entities/semestre.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class SemestresService {

  constructor(@InjectRepository(Semestre) private semestreRepository: Repository<Semestre>) { }

  async create(createSemestreDto: CreateSemestreDto) {
    const semestre = this.semestreRepository.create(createSemestreDto);
    return await this.semestreRepository.save(semestre);
  }

  async findAll() {
    return await this.semestreRepository.find();
  }

  async findOne(id: number) {
    return await this.semestreRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findOneByName(nombre: string) {
    return await this.semestreRepository.findOne({
      where: {
        nombre: nombre
      }
    });
  }

  async findOneByKey(nombre: string) {
    try {
      if (!nombre || typeof nombre !== 'string') throw new HttpException(`No se encontro el semstre`, HttpStatus.NOT_FOUND);
      const semestre = this.semestreRepository.find({
        where: {
          nombre: Like(`%${nombre}%`)
        }
      })
      return semestre;
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateSemestreDto: UpdateSemestreDto) {
    const semestre = this.semestreRepository.findOneBy({ id });
    if (!semestre) throw new HttpException(`No se encontro el semestre`, HttpStatus.NOT_FOUND);
    return await this.semestreRepository.update({ id }, updateSemestreDto);
  }

  async remove(id: number) {
    return await this.semestreRepository.softDelete({ id });
  }
}
