import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSoftwareDto } from './dto/create-software.dto';
import { UpdateSoftwareDto } from './dto/update-software.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Software } from './entities/software.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class SoftwaresService {

  constructor(@InjectRepository(Software) private softwareRepository: Repository<Software>) { }

  async create(createSoftwareDto: CreateSoftwareDto) {
    const software = this.softwareRepository.create(createSoftwareDto);
    return await this.softwareRepository.save(software);
  }

  async findAll() {
    return await this.softwareRepository.find();
  }

  async findOne(id: number) {
    return await this.softwareRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findOneByName(nombre: string) {
    return await this.softwareRepository.findOne({
      where: {
        nombre: nombre
      }
    });
  }

  async findOneByKey(nombre: string) {
    try {
      if (!nombre || typeof nombre !== 'string') throw new HttpException(`No se enctra el software`, HttpStatus.NOT_FOUND);
      const software = await this.softwareRepository.find({
        where: {
          nombre: Like(`%${nombre}%`)
        }
      })
      return software;
    } catch (error) {
      throw new HttpException(`Fallo interno`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateSoftwareDto: UpdateSoftwareDto) {
    const software = this.softwareRepository.findOneBy({ id })
    if (!software) throw new HttpException(`No se encontro el software`, HttpStatus.NOT_FOUND);
    return await this.softwareRepository.update({ id }, updateSoftwareDto);
  }

  async remove(id: number) {
    return await this.softwareRepository.softDelete({ id });
  }
}
