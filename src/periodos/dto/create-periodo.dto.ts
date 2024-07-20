import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreatePeriodoDto {

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    nombre: string

    @IsString()
    @Matches(/^(0[1-9]|1[0-2])$/, { message: 'inicio must be in MM format' })
    inicioMes: string;

    @IsString()
    @Matches(/^\d{4}$/, { message: 'inicio must be in YYYY format' })
    inicioAño: string;

    @IsString()
    @Matches(/^(0[1-9]|1[0-2])$/, { message: 'inicio must be in MM format' })
    finMes: string;

    @IsString()
    @Matches(/^\d{4}$/, { message: 'inicio must be in YYYY format' })
    finAño: string;

}
