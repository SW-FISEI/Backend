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

  async findOne(id: number) {
    return await this.semestreRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findSemestre(nombre?: string) {
    try {
      if (nombre && typeof nombre === "string") {
        return await this.semestreRepository.find({
          where: {
            nombre: Like(`%${nombre}%`)
          }
        });
      } else {
        return await this.semestreRepository.find();
      }
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
