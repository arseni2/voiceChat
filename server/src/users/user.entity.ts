import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RoomEntity} from "../room/room.entity";

@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    password: string

    @OneToMany(() => RoomEntity, (room) => room.author, {})
    rooms: RoomEntity[]
}