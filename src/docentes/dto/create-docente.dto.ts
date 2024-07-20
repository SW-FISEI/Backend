import { IsInt, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreateDocenteDto {

    @IsString()
    @MinLength(10)
    @MaxLength(10)
    cedula: number

    @IsString()
    @MinLength(4)
    @MaxLength(150)
    docente: string

    @IsInt()
    @IsPositive()
    titulo: number;

}
