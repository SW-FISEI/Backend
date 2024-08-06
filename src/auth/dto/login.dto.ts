import { Transform } from "class-transformer"
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class LoginDto {
    @IsEmail()
    @MinLength(4)
    @MaxLength(50)
    email: string

    @IsString()
    @MinLength(4)
    @MaxLength(30)
    contrasenia: string
}