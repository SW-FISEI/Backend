import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/rol.decorator';
import { Rol } from 'src/common/enum/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {

    const rol = this.reflector.getAllAndOverride<Rol>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!rol) return false;

    const { usuario } = context.switchToHttp().getRequest();

    if (usuario.rol === Rol.ADMIN) return true;

    return rol === usuario.rol;
  }
}