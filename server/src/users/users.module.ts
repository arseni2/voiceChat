import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UserEntity} from "./user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    providers: [UsersService],
    exports: [UsersService],
    imports: [TypeOrmModule.forFeature([UserEntity])]
})
export class UsersModule {
}
