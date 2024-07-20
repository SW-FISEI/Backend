import { IsInt, IsPositive, IsString, MaxLength, MinLength } from "class-validator"

export class CreateHorarioDto {

    @IsString()
    inicio: string

    @IsString()
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
