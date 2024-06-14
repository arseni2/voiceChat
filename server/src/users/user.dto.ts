import {ApiProperty} from "@nestjs/swagger";

export class UserCreateDTO {
    @ApiProperty()
    public firstname: string

    @ApiProperty()
    public lastname: string

    @ApiProperty()
    public email: string

    @ApiProperty()
    public password: string
}