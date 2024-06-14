import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketGateway } from './websocket.gateway';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  providers: [WebsocketGateway, WebsocketService],
  imports: [UsersModule, JwtModule]
})
export class WebsocketModule {}
