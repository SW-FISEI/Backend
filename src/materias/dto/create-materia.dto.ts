import { IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class CreateMateriaDto {

    @IsString()
    @MinLength(5)
    @MaxLength(50)
    nombre: string

    @IsString()
    @MinLength(5)
    @MaxLength(100)
    descripcion: string

}
