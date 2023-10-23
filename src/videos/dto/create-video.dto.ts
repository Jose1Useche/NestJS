import { IsNotEmpty, IsNumber, IsUrl, Length } from "class-validator";

export class CreateVideoDto {
    @IsNotEmpty()
    @Length(1, 15)
    title: string;

    @IsNumber()
    description: string;

    @IsUrl()
    src: string;
}
