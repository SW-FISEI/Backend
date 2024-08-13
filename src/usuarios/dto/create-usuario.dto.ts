import { IsEmail, IsString, MaxLength } from "class-validator";

export class CreateUsuarioDto {

    @IsString()
    @MaxLength(30)
    nombre: string;

    @IsEmail()
    @MaxLength(50)
    email: string;

    @IsString()
    contrasenia: string;
}
