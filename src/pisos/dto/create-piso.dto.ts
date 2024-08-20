import { IsString, MaxLength, MinLength } from "class-validator";

export class CreatePisoDto {

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    nombre: string

}
