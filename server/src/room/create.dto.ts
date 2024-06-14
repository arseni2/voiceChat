import {ApiProperty} from "@nestjs/swagger";

export class createRoomDTO {
    @ApiProperty({title: "title for room"})
    title: string
}