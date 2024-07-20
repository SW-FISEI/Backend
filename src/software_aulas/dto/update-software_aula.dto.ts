import { PartialType } from '@nestjs/mapped-types';
import { CreateSoftwareAulaDto } from './create-software_aula.dto';

export class UpdateSoftwareAulaDto extends PartialType(CreateSoftwareAulaDto) {}
