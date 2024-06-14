import {ApiProperty} from "@nestjs/swagger";

export class UserCallDto {
    @ApiProperty()
    public targetUserId:any

    @ApiProperty()
    public callerUserId:any

    @ApiProperty()
    public signal: any

    @ApiProperty()
    public roomId: number
}
