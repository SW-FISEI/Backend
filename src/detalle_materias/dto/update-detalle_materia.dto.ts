import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleMateriaDto } from './create-detalle_materia.dto';

export class UpdateDetalleMateriaDto extends PartialType(CreateDetalleMateriaDto) {}
