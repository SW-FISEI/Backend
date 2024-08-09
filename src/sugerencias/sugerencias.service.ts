import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSugerenciaDto } from './dto/create-sugerencia.dto';
import { UpdateSugerenciaDto } from './dto/update-sugerencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sugerencia } from './entities/sugerencia.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class SugerenciasService {

  constructor(@InjectRepository(Sugerencia) private sugerenciasRepository: Repository<Sugerencia>) { }

  async create(createSugerenciaDto: CreateSugerenciaDto) {
    const sugerencia = this.sugerenciasRepository.create(createSugerenciaDto)
    return await this.sugerenciasRepository.save(sugerencia);
  }

  async findAll() {
    return await this.sugerenciasRepository.find();
  }

  async findOne(id: number) {
    return await this.sugerenciasRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findSugerencia(sugerencia?: string) {
    try {
      if (sugerencia && typeof sugerencia === "string") {
        return await this.sugerenciasRepository.find({
          where: {
            sugerencia: Like(`%${sugerencia}%`)
          }
        });
      } else {
        return await this.sugerenciasRepository.find();
      }
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateSugerenciaDto: UpdateSugerenciaDto) {
    const sugerencia = this.sugerenciasRepository.findOneBy({ id });
    if (!sugerencia) throw new HttpException(`No se encontro la sugerencia`, HttpStatus.NOT_FOUND);
    return await this.sugerenciasRepository.update({ id }, updateSugerenciaDto);
  }

  async remove(id: number) {
    const sugerencia = this.sugerenciasRepository.findOneBy({ id });
    if (!sugerencia) throw new HttpException(`No se encontro la sugerencia`, HttpStatus.NOT_FOUND);
    return await this.sugerenciasRepository.softDelete({ id });
  }
}
