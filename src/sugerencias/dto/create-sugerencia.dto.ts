import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateSugerenciaDto {

    @IsString()
    @MinLength(4)
    @MaxLength(500)
    sugerencia: string

}
