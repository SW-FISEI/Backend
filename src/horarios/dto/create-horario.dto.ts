import { IsInt, IsPositive, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateHorarioDto {

    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'El campo inicio debe estar en formato HH:MM' })
    inicio: string

    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'El campo inicio debe estar en formato HH:MM' })
    fin: string

    @IsString()
    @MinLength(4)
    @MaxLength(15)
    dia: string

    @IsInt()
    @IsPositive()
    numero_dia: number

    @IsInt()
    @IsPositive()
    periodo: number

}
