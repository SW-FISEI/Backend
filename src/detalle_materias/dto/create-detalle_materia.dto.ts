import { IsInt, IsPositive } from "class-validator";

export class CreateDetalleMateriaDto {

    @IsInt()
    @IsPositive()
    carrera: number;

    @IsInt()
    @IsPositive()
    semestre: number;

    @IsInt()
    @IsPositive()
    materia: number;

    @IsInt()
    @IsPositive()
    paralelo: number;

}
