import { IsString, MaxLength, MinLength } from "class-validator"

export class CreateCarreraDto {

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    nombre: string

    @IsString()
    @MinLength(5)
    @MaxLength(100)
    descripcion: string

}
