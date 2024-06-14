"use client"
import {RoomType} from "@/api/room";
import {useState} from "react";
import Header from "@/components/Header";
import RoomCard from "@/components/RoomCard";
import {UserType} from "@/api/auth";

type propsType = {
    initialRooms: RoomType[]
    user: UserType
}

export const HomePage = ({initialRooms, user}: propsType) => {
    const [rooms, setRooms] = useState(initialRooms);
    const fetchRooms = async (room: RoomType) => {
        setRooms((prevValue) => [...prevValue, room]);
    };
    const deleteRoomById = (id: number) => {
        setRooms((prevValue) => prevValue.filter((room) => room.id !== id))
    }
    return (
        <div>
            <Header onRoomCreated={fetchRooms}/>
            <div className={"p-2 mt-2 flex gap-4 flex-wrap"}>
                {rooms ? rooms.map(room => (
                    <RoomCard deleteRoomById={deleteRoomById} key={room.id} title={room.title} memberCount={room.memberCount} id={room.id}/>
                )) : <p>net cpmnat</p>}
            </div>
        </div>
    );
}