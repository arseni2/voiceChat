import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../users/user.entity";

@Entity("Room")
export class RoomEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @ManyToOne(() => UserEntity, (user) => user.rooms, {})
    author: UserEntity

    @Column({nullable: true})
    password?: string
}