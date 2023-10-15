import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCourseDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'The age of a cat',
        minimum: 1,
        default: 1256,
    })   
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    cover: string;
}
