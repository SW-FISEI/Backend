import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLaboratoristaDto } from './dto/create-laboratorista.dto';
import { UpdateLaboratoristaDto } from './dto/update-laboratorista.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Laboratorista } from './entities/laboratorista.entity';
import { Like, Repository } from 'typeorm';
import { Titulo } from 'src/titulos/entities/titulo.entity';
import { Edificio } from 'src/edificios/entities/edificio.entity';

@Injectable()
export class LaboratoristasService {

  constructor(
    @InjectRepository(Laboratorista) private laboratoristaRepository: Repository<Laboratorista>,
    @InjectRepository(Titulo) private tituloRepository: Repository<Titulo>,
    @InjectRepository(Edificio) private edificioRepository: Repository<Edificio>) { }

  async create(createLaboratoristaDto: CreateLaboratoristaDto) {
    const { titulo, edificio, ...rest } = createLaboratoristaDto;

    const tituloEntity = await this.tituloRepository.findOne({ where: { id: titulo } });
    if (!tituloEntity) throw new HttpException(`Titulo con ID ${titulo} no se encontro`, HttpStatus.NOT_FOUND);

    const edificioEntity = await this.edificioRepository.findOne({ where: { id: edificio } });
    if (!edificioEntity) throw new HttpException(`Edificio con ID ${edificio} no se encontro`, HttpStatus.NOT_FOUND);

    const laboratorista = this.laboratoristaRepository.create({
      ...rest,
      titulo: tituloEntity,
      edificio: edificioEntity,
    });

    return await this.laboratoristaRepository.save(laboratorista);
  }

  async findOne(cedula: string) {
    return await this.laboratoristaRepository.find({
      where: {
        cedula: cedula
      },
      relations: ['titulo', 'edificio']
    });
  }

  async findLaboratorista(laboratorista?: string) {
    try {
      if (laboratorista && typeof laboratorista === "string") {
        return await this.laboratoristaRepository.find({
          where: {
            laboratorista: Like(`%${laboratorista}%`)
          },
          relations: ['titulo', 'edificio']
        })
      } else {
        return await this.laboratoristaRepository.find({
          relations: ['titulo', 'edificio']
        })
      }
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findTitulo(tituloId: number) {
    return await this.laboratoristaRepository.find({
      where: {
        titulo: { id: tituloId }
      },
      relations: ['titulo', 'edificio']
    });
  }

  async findEdificio(edificioId: number) {
    return await this.laboratoristaRepository.find({
      where: {
        edificio: { id: edificioId }
      },
      relations: ['titulo', 'edificio']
    });
  }

  async update(cedula: string, updateLaboratoristaDto: UpdateLaboratoristaDto) {
    const { titulo, edificio, ...rest } = updateLaboratoristaDto;

    const laboratorista = await this.laboratoristaRepository.findOne({ where: { cedula } });
    if (!laboratorista) throw new HttpException(`No se encontró el laboratorista`, HttpStatus.NOT_FOUND);

    const tituloE = await this.tituloRepository.findOne({ where: { id: titulo } });
    if (!tituloE) throw new HttpException(`No se encontró el título`, HttpStatus.NOT_FOUND);

    const edificioE = await this.edificioRepository.findOne({ where: { id: edificio } });
    if (!edificioE) throw new HttpException(`No se encontró el edificio`, HttpStatus.NOT_FOUND);

    await this.laboratoristaRepository.update(
      { cedula },
      {
        ...rest,
        titulo: tituloE,
        edificio: edificioE,
      }
    );

    return await this.laboratoristaRepository.findOne({ where: { cedula }, relations: ['titulo', 'edificio'] });
  }

  async remove(cedula: string) {
    return await this.laboratoristaRepository.softDelete({ cedula });
  }
}
