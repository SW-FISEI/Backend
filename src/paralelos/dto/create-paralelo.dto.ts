import { IsString, MaxLength, MinLength } from "class-validator"

export class CreateParaleloDto {

    @IsString()
    @MinLength(1)
    @MaxLength(4)
    nombre: string

}
