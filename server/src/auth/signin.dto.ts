import {ApiProperty} from "@nestjs/swagger";

export class SigninDto {
    @ApiProperty({type: "string"})
    email: string

    @ApiProperty({type: "string"})
    password: string
}