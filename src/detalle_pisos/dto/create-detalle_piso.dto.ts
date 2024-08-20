import { IsInt, IsPositive } from "class-validator";

export class CreateDetallePisoDto {

    @IsInt()
    @IsPositive()
    edificio: number;

    @IsInt()
    @IsPositive()
    piso: number;

}
