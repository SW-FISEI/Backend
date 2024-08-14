import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Docente } from './entities/docente.entity';
import { Like, Repository } from 'typeorm';
import { Titulo } from 'src/titulos/entities/titulo.entity';

@Injectable()
export class DocentesService {

  constructor(
    @InjectRepository(Docente) private docenteRepository: Repository<Docente>,
    @InjectRepository(Titulo) private tituloRepository: Repository<Titulo>
  ) { }

  async create(createDocenteDto: CreateDocenteDto) {
    const { titulo, ...rest } = createDocenteDto;

    const tituloE = await this.tituloRepository.findOne({ where: { id: titulo } })
    if (!tituloE) throw new HttpException(`No se encontro el titulo`, HttpStatus.NOT_FOUND)

    const docente = this.docenteRepository.create({
      ...rest,
      titulo: tituloE,
    });

    return await this.docenteRepository.save(docente)
  }

  async findOne(cedula: string) {
    return await this.docenteRepository.findOne({
      where: {
        cedula: cedula
      },
      relations: ['titulo']
    });
  }

  async findDocente(docente?: string) {
    try {
      if (docente && typeof docente === "string") {
        return await this.docenteRepository.find({
          where: {
            docente: Like(`%${docente}%`)
          },
          select: {
            cedula: true,
            docente: true,
            titulo: {
              nombre: true,
            }
          },
          relations: ['titulo']
        });
      } else {
        return await this.docenteRepository.find({
          relations: ['titulo']
        });
      }
    } catch (error) {
      throw new HttpException(`Error interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findTitle(tituloId: number) {
    return await this.docenteRepository.find({
      where: {
        titulo: { id: tituloId }
      },
      relations: ['titulo']
    });
  }

  async update(cedula: string, updateDocenteDto: UpdateDocenteDto) {
    const { titulo, ...rest } = updateDocenteDto

    const docente = await this.docenteRepository.findOne({ where: { cedula: cedula } })
    if (!docente) throw new HttpException(`No se encontro el docente`, HttpStatus.NOT_FOUND);

    const tituloE = await this.tituloRepository.findOne({ where: { id: titulo } });
    if (!tituloE) throw new HttpException(`No se encontró el título`, HttpStatus.NOT_FOUND);

    await this.docenteRepository.update({ cedula },
      {
        ...rest,
        titulo: tituloE
      });

    return await this.docenteRepository.findOne({
      where: { cedula },
      relations: ['titulo']
    });
  }

  async remove(cedula: string) {
    return await this.docenteRepository.softDelete({ cedula });
  }
}
