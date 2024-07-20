import { IsInt, IsPositive } from "class-validator";

export class CreateDetalleHorarioDto {

    @IsInt()
    @IsPositive()
    aula: number;

    @IsInt()
    @IsPositive()
    horario: number;

    @IsInt()
    @IsPositive()
    materia: number;

    @IsInt()
    @IsPositive()
    docente: number;

}
