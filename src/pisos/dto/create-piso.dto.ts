import { IsInt, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePisoDto {

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    nombre: string

    @IsInt()
    @IsPositive()
    edificio: number;

}
