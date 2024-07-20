import { Injectable } from '@nestjs/common';
import { CreateAccionesBdDto } from './dto/create-acciones_bd.dto';
import { UpdateAccionesBdDto } from './dto/update-acciones_bd.dto';

@Injectable()
export class AccionesBdService {
  create(createAccionesBdDto: CreateAccionesBdDto) {
    return 'This action adds a new accionesBd';
  }

  findAll() {
    return `This action returns all accionesBd`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accionesBd`;
  }

  update(id: number, updateAccionesBdDto: UpdateAccionesBdDto) {
    return `This action updates a #${id} accionesBd`;
  }

  remove(id: number) {
    return `This action removes a #${id} accionesBd`;
  }
}
