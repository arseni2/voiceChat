import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoomEntity} from "./room.entity";
import {UsersModule} from "../users/users.module";

@Module({
  providers: [RoomService],
  controllers: [RoomController],
  imports: [TypeOrmModule.forFeature([RoomEntity]), UsersModule]
})
export class RoomModule {}
