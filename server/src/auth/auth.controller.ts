import {Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthGuard} from "./auth.guard";
import {UserCreateDTO} from "../users/user.dto";
import {SigninDto} from "./signin.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SigninDto) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    signUp(@Body() userCreateDTO: UserCreateDTO) {
        return this.authService.signUp(userCreateDTO)
    }
}