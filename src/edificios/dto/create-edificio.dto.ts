import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateEdificioDto {

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    nombre: string

}
