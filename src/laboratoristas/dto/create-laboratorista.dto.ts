import { IsInt, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreateLaboratoristaDto {

    @IsString()
    @MinLength(10)
    @MaxLength(10)
    cedula: string

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    laboratorista: string

    @IsInt()
    @IsPositive()
    titulo: number

    @IsInt()
    @IsPositive()
    edificio: number;

}
