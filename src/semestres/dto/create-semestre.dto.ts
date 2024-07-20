import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateSemestreDto {

    @IsString()
    @MinLength(5)
    @MaxLength(50)
    nombre: string

}
