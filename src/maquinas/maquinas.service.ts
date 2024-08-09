import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMaquinaDto } from './dto/create-maquina.dto';
import { UpdateMaquinaDto } from './dto/update-maquina.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Maquina } from './entities/maquina.entity';
import { Like, Repository } from 'typeorm';
import { Aula } from 'src/aulas/entities/aula.entity';

@Injectable()
export class MaquinasService {

  constructor(
    @InjectRepository(Maquina) private maquinaRepository: Repository<Maquina>,
    @InjectRepository(Aula) private aulaRepository: Repository<Aula>
  ) { }

  async create(createMaquinaDto: CreateMaquinaDto) {
    const { aula, ...rest } = createMaquinaDto;

    const aulaE = await this.aulaRepository.findOne({
      where: {
        id: aula
      }
    });
    if (!aulaE) throw new HttpException(`No se encontor el aula`, HttpStatus.NOT_FOUND);

    const maquina = this.maquinaRepository.create({
      ...rest,
      aula: aulaE
    })
    return await this.maquinaRepository.save(maquina);
  }

  async findOne(id: number) {
    return await this.maquinaRepository.findOne({
      where: { id: id },
      relations: ['aula', 'observaciones']
    });
  }

  async findMaquina(nombre?: string) {
    try {
      if (nombre && typeof nombre === "string") {
        return await this.maquinaRepository.find({
          where: {
            nombre: Like(`%${nombre}%`)
          },
          relations: ['aula', 'observaciones']
        });
      } else {
        return await this.maquinaRepository.find({
          relations: ['aula', 'observaciones']
        });
      }
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAula(nombre?: string) {
    try {
      if (nombre && typeof nombre === "string") {
        return await this.maquinaRepository.find({
          where: {
            aula: { nombre: Like(`%${nombre}%`) }
          },
          relations: ['aula', 'observaciones']
        })
      } else {
        return await this.maquinaRepository.find({
          relations: ['aula', 'observaciones']
        })
      }
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateMaquinaDto: UpdateMaquinaDto) {
    const { aula, ...rest } = updateMaquinaDto;

    const aulaE = await this.aulaRepository.findOne({
      where: {
        id: aula
      }
    });
    if (!aulaE) throw new HttpException(`No se encontro el aula`, HttpStatus.NOT_FOUND)

    await this.maquinaRepository.update({ id }, {
      ...rest,
      aula: aulaE
    });
    return await this.maquinaRepository.findOne({
      where: {
        id: id
      },
      relations: ['aula']
    });
  }

  async remove(id: number) {
    return await this.maquinaRepository.softDelete({ id });
  }
}
