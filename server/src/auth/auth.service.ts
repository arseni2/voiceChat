import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {UserEntity} from "../users/user.entity";
import {JwtService} from '@nestjs/jwt';
import {UserCreateDTO} from "../users/user.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async signIn(email: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findOneByEmail(email);
        if (user?.password !== pass) {
            throw new HttpException('не правильный пароль или почта', HttpStatus.UNAUTHORIZED);
        }
        const {password, ...result} = user;
        const payload = {id: user.id, email: user.email};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(dto: UserCreateDTO) {
        try {
            const user = await this.usersService.create(dto) //user || error
            // if(!user.id) {
            //     return user
            // }
            const {password, ...result} = user;
            const payload = {id: user.id, email: user.email};
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        } catch (e) {
            throw e
        }
    }
}
