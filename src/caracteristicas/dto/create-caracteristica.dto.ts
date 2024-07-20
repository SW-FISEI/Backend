import { IsBoolean, IsInt, IsOptional, IsPositive, IsString, Max, MaxLength, MinLength } from "class-validator"

export class CreateCaracteristicaDto {

    @IsInt()
    @IsPositive()
    @Max(50)
    cantidad_pc: number;

    @IsInt()
    @IsPositive()
    @Max(50)
    capacidad: number;

    @IsBoolean()
    proyector: boolean;

    @IsBoolean()
    aire: boolean;

    @IsString()
    @MinLength(4)
    @MaxLength(150)
    descripcion: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    aula: number;

}
