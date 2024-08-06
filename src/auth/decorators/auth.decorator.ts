import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Rol } from '../enum/rol.enum';
import { Roles } from './rol.decorator';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';

export function Auth(rol: Rol) {
    return applyDecorators(
        Roles(rol),
        UseGuards(AuthGuard, RolesGuard)
    )
}