import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Roles } from './rol.decorator';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Rol } from 'src/common/enum/rol.enum';

export function Auth(rol: Rol) {
    return applyDecorators(
        Roles(rol),
        UseGuards(AuthGuard, RolesGuard)
    )
}