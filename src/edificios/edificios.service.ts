import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEdificioDto } from './dto/create-edificio.dto';
import { UpdateEdificioDto } from './dto/update-edificio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Edificio } from './entities/edificio.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class EdificiosService {

  constructor(@InjectRepository(Edificio) private edificioRepository: Repository<Edificio>) { }

  async create(createEdificioDto: CreateEdificioDto) {
    const edificio = this.edificioRepository.create(createEdificioDto)
    return await this.edificioRepository.save(edificio);
  }

  async findOne(id: number) {
    return await this.edificioRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findEdificio(nombre?: string) {
    try {
      if (nombre && typeof nombre === "string") {
        return await this.edificioRepository.find({
          where: {
            nombre: Like(`%${nombre}%`)
          }
        });
      } else {
        return await this.edificioRepository.find();
      }
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateEdificioDto: UpdateEdificioDto) {
    return await this.edificioRepository.update({ id }, updateEdificioDto);
  }

  async remove(id: number) {
    return await this.edificioRepository.softDelete({ id });
  }
}
