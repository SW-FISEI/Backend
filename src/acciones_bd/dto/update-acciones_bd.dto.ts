import { PartialType } from '@nestjs/mapped-types';
import { CreateAccionesBdDto } from './create-acciones_bd.dto';

export class UpdateAccionesBdDto extends PartialType(CreateAccionesBdDto) {}
