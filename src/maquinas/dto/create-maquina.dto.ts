import { IsInt, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMaquinaDto {

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    nombre: string

    @IsInt()
    @IsPositive()
    aula: number;

}
