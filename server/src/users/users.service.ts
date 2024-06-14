import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {UserEntity} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UserCreateDTO} from "./user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private repo: Repository<UserEntity>
    ) {
    }
    async findOneByEmail(email: string): Promise<UserEntity | undefined> {
        return this.repo.findOne({where: {email}});
    }

    async findOneById(id: number) {
        return this.repo.findOneBy({id})
    }

    async create(dto: UserCreateDTO): Promise<any> {
        try {
            return await this.repo.save(dto)
        } catch (e) {
            if(e) {
                throw new HttpException("email must be unique", HttpStatus.BAD_REQUEST)
            }
        }
    }
}
