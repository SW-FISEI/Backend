import { IsInt, IsPositive, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Dias } from "src/common/enum/dias.enum";

export class CreateDetalleHorarioDto {

    @IsInt()
    @IsPositive()
    aula: number;

    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'El campo inicio debe estar en formato HH:MM' })
    inicio: string

    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'El campo fin debe estar en formato HH:MM' })
    fin: string

    @IsString()
    @MinLength(4)
    @MaxLength(15)
    dia: Dias

    @IsInt()
    @IsPositive()
    periodo: number

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
