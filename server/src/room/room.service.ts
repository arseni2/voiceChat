import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {RoomEntity} from "./room.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {createRoomDTO} from "./create.dto";
import {UsersService} from "../users/users.service";
import {UserType} from "../types";

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(RoomEntity)
        private repo: Repository<RoomEntity>,

        private userService: UsersService
    ) {
    }

    // async addMemberToRoom(id: number, userId: number) {
    //     const room = await this.repo.findOneBy({id})
    //     const user = await this.userService.findOneById(userId)
    //     room.users.push(user)
    //     return this.repo.save(room)
    // }

    async deleteRoom(id: number, user: UserType): Promise<HttpException | any> {
        const room = await this.repo.findOne({
            where: {id},
            relations: ['author']
        })
        if(!room) return new HttpException("Room not found", HttpStatus.NOT_FOUND)
        if(room.author?.id !== user.id) return new HttpException("Access denied", HttpStatus.FORBIDDEN)
        const roomData = { ...room };
        await this.repo.remove(room)
        return roomData
    }

    async create(dto: createRoomDTO, user: UserType) {
        const userDB = await this.userService.findOneById(user.id)
        return this.repo.save({...dto, author: userDB})
    }

    async getAll() {
        return this.repo.find({relations: ['author']})
    }
}