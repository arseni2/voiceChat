import { Injectable } from '@nestjs/common';
import { Socket } from "socket.io";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../auth/constants";
import { UserEntity } from "../users/user.entity";
import { UserCallDto } from "./dto/user-call.dto";

export type SocketRoom = Record<string, { roomId: number; user: UserEntity }>;

@Injectable()
export class WebsocketService {
    private rooms: SocketRoom = {};

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    private async getUserByToken(tokenWithBearer: string) {
        const [type, token] = tokenWithBearer.split(' ') ?? [];
        let userFromToken = await this.jwtService.verifyAsync(token, {
            secret: jwtConstants.secret
        });
        return this.usersService.findOneById(userFromToken.id);
    }

    async userJoinToRoom(socket: Socket, roomId: number, token: string, io: any) {
        socket.join(`ROOM/${roomId}`);
        const user = await this.getUserByToken(token);
        console.log(user)
        this.rooms[socket.id] = { roomId, user };
        const allUserInRoom = this.getUsersFromRoom(this.rooms, roomId);

        console.log(`User ${user.id} joined room ${roomId}`);

        io.emit('SERVER@ROOMS:HOME', { roomId: Number(roomId), allUserInRoom });
        io.in(`ROOM/${roomId}`).emit('SERVER@ROOMS:JOIN', allUserInRoom);
    }

    private getUsersFromRoom(rooms: SocketRoom, roomId: number) {
        return Object.values(rooms).filter((obj) => obj.roomId === roomId)
            .map((obj) => ({ ...obj.user, roomId: Number(roomId) }));
    }

    userLeaveFromRoom(socket: Socket) {
        if (this.rooms[socket.id]) {
            const { roomId, user } = this.rooms[socket.id];
            console.log(`User ${user.id} left room ${roomId}`);
            socket.broadcast.to(`ROOM/${roomId}`).emit('SERVER@ROOMS:LEAVE', user);
            delete this.rooms[socket.id];
        }
    }

    userCall(dto: UserCallDto, socket: Socket) {
        console.log(`User ${dto.callerUserId} is calling user ${dto.targetUserId} in room ${dto.roomId}`);
        socket.broadcast.to(`ROOM/${dto.roomId}`).emit('SERVER@ROOMS:CALL', {
            targetUserId: dto.targetUserId,
            callerUserId: dto.callerUserId,
            signal: dto.signal,
        });
    }

    answer(socket: Socket) {
        socket.on('CLIENT@ROOMS:ANSWER', ({ targetUserId, callerUserId, roomId, signal }) => {
            console.log(`Answer received from user ${targetUserId} to user ${callerUserId} in room ${roomId}`);
            socket.broadcast.to(`ROOM/${roomId}`).emit('SERVER@ROOMS:ANSWER', {
                targetUserId,
                callerUserId,
                signal,
            });
        });
    }
}
