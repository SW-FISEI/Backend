import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateObservacioneDto } from './dto/create-observacione.dto';
import { UpdateObservacioneDto } from './dto/update-observacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observacione } from './entities/observacione.entity';
import { Maquina } from 'src/maquinas/entities/maquina.entity';

@Injectable()
export class ObservacionesService {

  constructor(
    @InjectRepository(Observacione) private observacionRepository: Repository<Observacione>,
    @InjectRepository(Maquina) private maquinaRepository: Repository<Maquina>) { }

  async create(createObservacioneDto: CreateObservacioneDto) {
    const { maquina, ...rest } = createObservacioneDto;

    const maquinaE = await this.maquinaRepository.findOne({
      where: {
        id: maquina
      }
    });
    if (!maquinaE) throw new HttpException(`No se encontro la maquina`, HttpStatus.NOT_FOUND);

    const observacion = this.observacionRepository.create({
      ...rest,
      maquina: maquinaE
    })
    return await this.observacionRepository.save(observacion);
  }

  async findAll() {
    return await this.observacionRepository.find({
      relations: ['maquina']
    });
  }

  async findOne(id: number) {
    return await this.observacionRepository.findOne({
      where: {
        id: id
      },
      relations: ['maquina']
    });
  }

  async findMaquina(maquina: number) {
    return await this.observacionRepository.find({
      where: {
        maquina: { id: maquina }
      },
      relations: ['maquina']
    });
  }

  async findMaquinaNombre(nombre: string) {
    return await this.observacionRepository.find({
      where: {
        maquina: { nombre: nombre }
      },
      relations: ['maquina']
    })
  }

  async update(id: number, updateObservacioneDto: UpdateObservacioneDto) {
    const { maquina, ...rest } = updateObservacioneDto;

    const maquinaE = await this.maquinaRepository.findOne({
      where: {
        id: maquina
      }
    });
    if (!maquinaE) throw new HttpException(`No se encontr la maquina`, HttpStatus.NOT_FOUND);

    await this.observacionRepository.update({ id }, {
      ...rest,
      maquina: maquinaE
    });
    return await this.observacionRepository.findOne({
      where: {
        id: id
      },
      relations: ['maquina']
    });
  }

  async remove(id: number) {
    return await this.observacionRepository.softDelete({ id });
  }
}
