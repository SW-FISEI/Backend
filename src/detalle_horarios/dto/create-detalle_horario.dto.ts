import { IsInt, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

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

    @IsString()
    @MaxLength(10)
    @MinLength(10)
    docente: string;

}
