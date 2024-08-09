import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Materia } from './entities/materia.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class MateriasService {

  constructor(@InjectRepository(Materia) private materiaRepository: Repository<Materia>) { }

  async create(createMateriaDto: CreateMateriaDto) {
    const materia = this.materiaRepository.create(createMateriaDto);
    return await this.materiaRepository.save(materia);
  }

  async findOne(id: number) {
    return await this.materiaRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findMateria(nombre?: string) {
    try {
      if (nombre && typeof nombre === "string") {
        return await this.materiaRepository.find({
          where: {
            nombre: Like(`%${nombre}%`)
          }
        });
      } else {
        return await this.materiaRepository.find();
      }
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateMateriaDto: UpdateMateriaDto) {
    const materia = this.materiaRepository.findBy({ id });
    if (!materia) throw new HttpException(`No se encotnro la materia`, HttpStatus.NOT_FOUND);
    return await this.materiaRepository.update({ id }, updateMateriaDto);
  }

  async remove(id: number) {
    return await this.materiaRepository.softDelete({ id });
  }
}
