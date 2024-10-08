import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './constants/jwt.constant';

@Module({
  imports: [UsuariosModule,
    JwtModule.register({
      global: true,
      secret: jwtConstant.secret,
      signOptions: { expiresIn: "1d" },
    })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
