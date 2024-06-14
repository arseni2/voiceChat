import {Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards} from '@nestjs/common';
import {RoomService} from "./room.service";
import {createRoomDTO} from "./create.dto";
import {ApiBearerAuth, ApiBody, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "../auth/auth.guard";
import {RequestWithUser} from "../types";

@ApiTags('rooms')
@Controller('room')
@ApiBearerAuth()
export class RoomController {
    constructor(
        private roomService: RoomService
    ) {
    }

    @UseGuards(AuthGuard)
    @ApiBody({ type: createRoomDTO })
    @Post("create")
    async createRoom(@Body() dto: createRoomDTO, @Request() req: RequestWithUser) {
        return this.roomService.create(dto, req.user)
    }

    @UseGuards(AuthGuard)
    @Delete("delete/:id")
    async deleteRoom(@Param('id') id: string,  @Request() req: RequestWithUser) {
        return this.roomService.deleteRoom(Number(id), req.user)
    }

    @Get("all")
    async getAllRoom() {
        return this.roomService.getAll()
    }

    // @UseGuards(AuthGuard)
    // @Patch("connect/:id")
    // async addMemberToRoom(@Param('id') id: string, @Request() req: RequestWithUser) {
    //     return this.roomService.addMemberToRoom(Number(id), req.user.id)
    // }
}