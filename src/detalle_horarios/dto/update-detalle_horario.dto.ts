import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleHorarioDto } from './create-detalle_horario.dto';

export class UpdateDetalleHorarioDto extends PartialType(CreateDetalleHorarioDto) {}
