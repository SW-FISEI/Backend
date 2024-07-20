import { IsString, MaxLength, MinLength } from "class-validator"

export class CreateTituloDto {
    
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    nombre: string

    @IsString()
    @MinLength(3)
    @MaxLength(25)
    abreviacion: string

}
