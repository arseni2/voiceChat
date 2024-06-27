"use client";
import React, {useEffect, useRef, useState} from 'react';
import Header from "@/components/Header";
import Speaker from "@/components/Speaker";
import {UserType} from "@/api/auth";
import Peer from 'simple-peer';
import {useSocket} from "@/hooks/useSocket";

let peers = [];

const RoomDetail = ({ params }) => {
    const roomId = Number(params.id);
    const socket = useSocket();
    const [users, setUsers] = useState([]);
    const audioRef = useRef<null | HTMLAudioElement>(null)


    useEffect(() => {

        socket?.on("disconnect", (data) => {
            console.log(data)
        })

        socket?.emit("CLIENT@ROOMS:JOIN", roomId)

        socket?.on("SERVER@ROOMS:HOME", (room) => {
             setUsers(room.allUserInRoom)
        })

        socket?.on('SERVER@ROOMS:LEAVE', (leaveUser: UserType) => {
            console.log("leaveUser", leaveUser)
            setUsers((prev) =>
                prev.filter((prevUser: UserType) => {
                    return prevUser.id !== leaveUser.id;
                }),
            );
        });

    }, [])

    return (
        <div>
            <Header />
            <div className="p-2 flex gap-4 flex-wrap">
                {users && users.map((user, i) => {
                    return <Speaker key={i} />;
                })}
            </div>
        </div>
    );
};

export default RoomDetail;
