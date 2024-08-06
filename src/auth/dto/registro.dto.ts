import { Transform } from "class-transformer"
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class RegistroDto {
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    nombre: string

    @IsEmail()
    @MinLength(4)
    @MaxLength(50)
    email: string

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    contrasenia: string
}