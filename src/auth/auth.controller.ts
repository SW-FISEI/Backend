import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Auth } from './decorators/auth.decorator';
import { Rol } from './enum/rol.enum';
import { RequestConUsuario } from './interface/request-con-usuario.interface';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('registro')
    registro(@Body() registroDto: RegistroDto) {
        return this.authService.registro(registroDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('test')
    @Auth(Rol.ADMIN)
    test(@Request() req: RequestConUsuario) {
        return this.authService.test({
            email: req.usuario.email,
            rol: req.usuario.rol
        })
    }
}
