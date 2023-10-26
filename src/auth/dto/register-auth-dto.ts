import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class RegisterAuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}
