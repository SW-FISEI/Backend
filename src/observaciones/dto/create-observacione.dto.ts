import { IsInt, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreateObservacioneDto {

    @IsString()
    @MinLength(4)
    @MaxLength(300)
    descripcion: string

    @IsInt()
    @IsPositive()
    maquina: number;

}
