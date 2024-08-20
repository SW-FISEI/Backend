import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSoftwareAulaDto } from './dto/create-software_aula.dto';
import { UpdateSoftwareAulaDto } from './dto/update-software_aula.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SoftwareAula } from './entities/software_aula.entity';
import { Repository } from 'typeorm';
import { Software } from 'src/softwares/entities/software.entity';
import { Aula } from 'src/aulas/entities/aula.entity';

@Injectable()
export class SoftwareAulasService {

  constructor(
    @InjectRepository(SoftwareAula) private softwareAulaRepository: Repository<SoftwareAula>,
    @InjectRepository(Software) private softwareRepository: Repository<Software>,
    @InjectRepository(Aula) private aulaRepository: Repository<Aula>
  ) { }

  async create(createSoftwareAulaDto: CreateSoftwareAulaDto) {
    const { software, aula, ...rest } = createSoftwareAulaDto;

    const softwareE = await this.softwareRepository.findOne({
      where: {
        id: software
      }
    });
    if (!softwareE) throw new HttpException(`No se encontro el software`, HttpStatus.NOT_FOUND);

    const aulaE = await this.aulaRepository.findOne({
      where: {
        id: aula
      }
    });
    if (!aulaE) throw new HttpException(`No se encontro el aula`, HttpStatus.NOT_FOUND);

    const software_aula = this.softwareAulaRepository.create({
      ...rest,
      software: softwareE,
      aula: aulaE,
    });
    return await this.softwareAulaRepository.save(software_aula);
  }

  async findAll() {
    return await this.softwareAulaRepository.find({
      relations: ['software', 'aula', 'aula.detalle_piso.piso', 'aula.detalle_piso.edificio']
    });
  }

  async findOne(id: number) {
    return await this.softwareAulaRepository.findOne({
      where: {
        id: id
      },
      relations: ['software', 'aula', 'aula.detalle_piso.piso', 'aula.detalle_piso.edificio']
    });
  }

  async findSoftware(software: number) {
    return await this.softwareAulaRepository.find({
      where: {
        software: { id: software }
      },
      relations: ['software', 'aula', 'aula.detalle_piso.piso', 'aula.detalle_piso.edificio']
    })
  }

  async findAula(aula: number) {
    return await this.softwareAulaRepository.find({
      where: {
        aula: { id: aula }
      },
      relations: ['software', 'aula', 'aula.detalle_piso.piso', 'aula.detalle_piso.edificio']
    })
  }

  async update(id: number, updateSoftwareAulaDto: UpdateSoftwareAulaDto) {
    const { software, aula, ...rest } = updateSoftwareAulaDto;

    const software_aulaE = await this.softwareAulaRepository.findOne({
      where: {
        id: id
      }
    });
    if (!software_aulaE) throw new HttpException(`No se encontro el detalle`, HttpStatus.NOT_FOUND);

    const softwareE = await this.softwareRepository.findOne({
      where: {
        id: software
      }
    });
    if (!softwareE) throw new HttpException(`No se encontro el software`, HttpStatus.NOT_FOUND);

    const aulaE = await this.aulaRepository.findOne({
      where: {
        id: aula
      }
    });
    if (!aulaE) throw new HttpException(`No se encontro el aula`, HttpStatus.NOT_FOUND);

    await this.softwareAulaRepository.update({ id }, {
      ...rest,
      software: softwareE,
      aula: aulaE
    });
    return await this.softwareAulaRepository.findOne({
      where: {
        id: id
      },
      relations: ['software', 'aula', 'aula.detalle_piso.piso', 'aula.detalle_piso.edificio']
    });
  }

  async remove(id: number) {
    return await this.softwareAulaRepository.softDelete({ id });
  }
}
