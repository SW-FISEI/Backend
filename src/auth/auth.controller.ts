import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Auth } from './decorators/auth.decorator';
import { RequestConUsuario } from './interface/request-con-usuario.interface';
import { Rol } from 'src/common/enum/rol.enum';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Auth')
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

    @ApiUnauthorizedResponse({
        description: 'Unauthorized Bearer Auth',
    })
    @ApiBearerAuth()
    @Get('test')
    @Auth(Rol.ADMIN)
    test(@Request() req: RequestConUsuario) {
        return this.authService.test({
            email: req.usuario.email,
            rol: req.usuario.rol
        })
    }
}
