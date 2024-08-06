import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UsuariosService {

  constructor(@InjectRepository(Usuario) private readonly usuariosRepository: Repository<Usuario>) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuario = await this.usuariosRepository.findOne({
      where:
        { email: createUsuarioDto.email }
    });
    if (usuario) throw new HttpException(`Correo existente`, HttpStatus.BAD_REQUEST);

    const usuarioE = await this.usuariosRepository.create(createUsuarioDto);

    return await this.usuariosRepository.save(usuarioE);
  }

  async findOneByEmail(email: string) {
    return await this.usuariosRepository.findOneBy({ email })
  }

  async findNameByKey(nombre: string) {
    try {
      if (!nombre || typeof nombre !== 'string') throw new HttpException(`No se encontor el usuario`, HttpStatus.NOT_FOUND);

      const usuario = this.usuariosRepository.find({
        where: {
          nombre: Like(`%${nombre}%`)
        }
      });
    } catch (error) {
      throw new HttpException(`Error Interno`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuariosRepository.findOneBy({ id });
    if (!usuario) throw new HttpException(`Usuario no encontrado`, HttpStatus.NOT_FOUND);

    const emailExistente = await this.usuariosRepository.findOne({
      where:
        { email: updateUsuarioDto.email }
    });
    if (emailExistente) throw new HttpException(`Correo existente`, HttpStatus.BAD_REQUEST);

    await this.usuariosRepository.update({ id }, updateUsuarioDto)

    return await this.usuariosRepository.findOne({
      where: {
        id: id
      }
    })
  }

  async remove(id: number) {
    return await this.usuariosRepository.softDelete(id);
  }
}
