import { IsInt, IsPositive, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateLaboratoristaDto {

    @IsString()
    @MinLength(10)
    @MaxLength(10)
    @Matches(/^\d+$/, { message: 'La cédula debe contener solo números' })
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
