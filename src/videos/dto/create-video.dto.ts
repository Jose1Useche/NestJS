import { IsNotEmpty, IsNumber, IsUrl, Length } from "class-validator";

export class CreateVideoDto {
    @IsNotEmpty()
    @Length(1, 15)
    title: string;

    @IsNumber()
    description: number;

    @IsUrl()
    src: string;
}
