import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { RoomModule } from './room/room.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: "dpg-cpdvaf5ds78s73eo5ru0-a.oregon-postgres.render.com",
            port: 5432,
            username: "db_mctj_user",
            password: "SOsRijRogFqg2PEXUfC3ENIFlo7tRjnL",
            database: "db_mctj",
            synchronize: true,
            autoLoadEntities: true,
            ssl: true
        }),
        AuthModule,
        UsersModule,
        RoomModule,
        WebsocketModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
