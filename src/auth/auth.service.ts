import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { RegistroDto } from './dto/registro.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService
    ) { }

    async registro({ nombre, email, contrasenia }: RegistroDto) {
        const usuario = await this.usuariosService.findOneByEmail(email);
        if (usuario) throw new HttpException(`Correo existente`, HttpStatus.BAD_REQUEST);

        return await this.usuariosService.create({
            nombre,
            email,
            contrasenia: await bcryptjs.hash(contrasenia, 12)
        });
    }

    async login({ email, contrasenia }: LoginDto) {
        const usuario = await this.usuariosService.findOneByEmail(email);
        if (!usuario) throw new HttpException(`No se encontor el email`, HttpStatus.NOT_FOUND);

        const isContrasenia = await bcryptjs.compare(contrasenia, usuario.contrasenia);
        if (!isContrasenia) throw new HttpException(`Constraseña Incorrecta`, HttpStatus.BAD_REQUEST);

        const payload = { email: usuario.email, rol: usuario.rol };

        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            email: usuario.email
        };
    }

    async test({ email, rol }: { email: string, rol: string }) {
        return await this.usuariosService.findOneByEmail(email)
    }

}
