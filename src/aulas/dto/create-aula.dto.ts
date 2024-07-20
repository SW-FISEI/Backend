import { IsInt, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAulaDto {

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    nombre: string

    @IsInt()
    @IsPositive()
    piso: number;

    @IsInt()
    @IsPositive()
    caracteristica: number;

}
