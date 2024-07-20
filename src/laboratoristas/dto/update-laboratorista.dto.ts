import { PartialType } from '@nestjs/mapped-types';
import { CreateLaboratoristaDto } from './create-laboratorista.dto';

export class UpdateLaboratoristaDto extends PartialType(CreateLaboratoristaDto) {}
