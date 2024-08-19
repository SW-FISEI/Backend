import { IsString, MaxLength, MinLength } from "class-validator"

export class CreateSoftwareDto {

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    nombre: string

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    version: string

    @IsString()
    @MinLength(4)
    @MaxLength(200)
    descripcion: string

}
