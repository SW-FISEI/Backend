import { PartialType } from '@nestjs/swagger';
import { CreateDetallePisoDto } from './create-detalle_piso.dto';

export class UpdateDetallePisoDto extends PartialType(CreateDetallePisoDto) {}
