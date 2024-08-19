import { IsInt, IsOptional, IsPositive } from "class-validator";

export class CreateDetalleMateriaDto {

    @IsInt()
    @IsPositive()
    carrera: number;

    @IsInt()
    @IsPositive()
    @IsOptional()
    semestre: number;

    @IsInt()
    @IsPositive()
    materia: number;

    @IsInt()
    @IsPositive()
    paralelo: number;

}
