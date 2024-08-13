import { IsEnum, IsInt, IsPositive, IsString, Max, MaxLength, MinLength } from "class-validator";
import { Caracteristicas } from "src/common/enum/caracteristicas.enum";

export class CreateAulaDto {

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    nombre: string

    @IsInt()
    @IsPositive()
    @Max(50)
    cantidad_pc: number;

    @IsInt()
    @IsPositive()
    @Max(50)
    capacidad: number;

    @IsEnum(Caracteristicas)
    proyector: Caracteristicas;

    @IsEnum(Caracteristicas)
    aire: Caracteristicas;

    @IsString()
    @MinLength(4)
    @MaxLength(150)
    descripcion: string;

    @IsInt()
    @IsPositive()
    piso: number;

}
