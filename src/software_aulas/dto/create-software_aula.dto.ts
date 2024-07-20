import { IsInt, IsPositive } from "class-validator";

export class CreateSoftwareAulaDto {

    @IsInt()
    @IsPositive()
    software: number;

    @IsInt()
    @IsPositive()
    aula: number;

}
