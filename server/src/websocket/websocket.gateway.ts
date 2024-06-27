import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayDisconnect} from '@nestjs/websockets';
import {WebsocketService} from './websocket.service';
import {Socket} from 'socket.io';
import {UpdateWebsocketDto} from './dto/update-websocket.dto';
import {UserCallDto} from "./dto/user-call.dto";

@WebSocketGateway({cors: '*:*'})
export class WebsocketGateway {
    constructor(private readonly websocketService: WebsocketService) {

    }
    @WebSocketServer() server: any
    @SubscribeMessage('CLIENT@ROOMS:JOIN')
    userConnect(@MessageBody() roomId: number, @ConnectedSocket() socket: Socket) {
        return this.websocketService.userJoinToRoom(socket, roomId, socket.handshake.headers.authorization, this.server);
    }

    @SubscribeMessage('CLIENT@ROOMS:CALL')
    userCall(@MessageBody() dto: UserCallDto, @ConnectedSocket() socket: Socket) {
        return this.websocketService.userCall(dto, socket);
    }

    @SubscribeMessage('CLIENT@ROOMS:ANSWER')
    answer(@ConnectedSocket() socket: Socket) {
        return this.websocketService.answer(socket);
    }

    handleDisconnect(socket: Socket){
        console.log("DISCONNECT")
        this.websocketService.userLeaveFromRoom(socket);
    }
}
