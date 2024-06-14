"use client";
import React, { useEffect, useState } from 'react';
import Header from "@/components/Header";
import { io, Socket } from "socket.io-client";
import Speaker from "@/components/Speaker";
import { getUserProfile, UserType } from "@/api/auth";
import { useCookies } from "next-client-cookies";
import Peer from 'simple-peer';
import { useSocket } from "@/hooks/useSocket";

let peers = [];

const RoomDetail = ({ params }) => {
    const roomId = Number(params.id);
    const [socket, user] = useSocket();
    console.log("START", user)
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined' && user) {
            setUsers([user])
            console.log('Window is defined, starting media stream');
            navigator.mediaDevices
                .getUserMedia({
                    audio: true,
                })
                .then((stream) => {
                    console.log('Media stream obtained');

                    socket.emit('CLIENT@ROOMS:JOIN', {
                        user,
                        roomId,
                    });
                    console.log('CLIENT@ROOMS:JOIN event emitted');

                    socket.on('connect', () => {
                        console.log('Socket connected:', socket.id);
                    });

                    socket.on('SERVER@ROOMS:JOIN', (allUsers) => {
                        console.log('SERVER@ROOMS:JOIN event received');
                        console.log(allUsers);

                        setUsers(allUsers);

                        allUsers.forEach((speaker) => {
                            if (user.id !== speaker.id && !peers.find((obj) => obj.id === speaker.id)) {
                                const peerIncome = new Peer({
                                    initiator: true,
                                    trickle: false,
                                    stream,
                                });

                                peerIncome.on('signal', (signal) => {
                                    console.log(signal, 222);
                                    console.log(
                                        '1. СИГНАЛ СОЗДАН. ПРОСИМ ЮЗЕРА ' + speaker.firstname + ' НАМ ПОЗВОНИТЬ',
                                    );
                                    socket.emit('CLIENT@ROOMS:CALL', {
                                        targetUserId: speaker.id,
                                        callerUserId: user.id,
                                        roomId,
                                        signal,
                                    });
                                    peers.push({
                                        peer: peerIncome,
                                        id: speaker.id,
                                    });
                                });

                                socket.on(
                                    'SERVER@ROOMS:CALL',
                                    ({ targetUserId, callerUserId, signal: callerSignal }) => {
                                        console.log('2. ЮЗЕР ' + callerUserId + ' ПОДКЛЮЧИЛСЯ, ЗВОНИМ!');

                                        const peerOutcome = new Peer({
                                            initiator: false,
                                            trickle: false,
                                            stream,
                                        });

                                        peerOutcome.signal(callerSignal);

                                        peerOutcome
                                            .on('signal', (outSignal) => {
                                                console.log(
                                                    '3. ПОЛУЧИЛИ СИГНАЛ НАШ, ОТПРАВЛЯЕМ В ОТВЕТ ЮЗЕРУ ' + callerUserId,
                                                );
                                                socket.emit('CLIENT@ROOMS:ANSWER', {
                                                    targetUserId: callerUserId,
                                                    callerUserId: targetUserId,
                                                    roomId,
                                                    signal: outSignal,
                                                });
                                            })
                                            .on('stream', (stream) => {
                                                let audio = document.querySelector('audio');
                                                if (audio) {
                                                    audio.srcObject = stream;
                                                    audio.play();
                                                }
                                            });
                                    },
                                );

                                socket.on('SERVER@ROOMS:ANSWER', ({ callerUserId, signal }) => {
                                    const obj = peers.find((obj) => Number(obj.id) === Number(callerUserId));
                                    if (obj) {
                                        obj.peer.signal(signal);
                                    }
                                    console.log('4. МЫ ОТВЕТИЛИ ЮЗЕРУ', callerUserId);
                                });
                            }
                        });
                    });

                    socket.on('SERVER@ROOMS:LEAVE', (leaveUser) => {
                        console.log(leaveUser.id, peers);
                        setUsers((prev) =>
                            prev.filter((prevUser) => {
                                const peerUser = peers.find((obj) => Number(obj.id) === Number(leaveUser.id));
                                if (peerUser) {
                                    peerUser.peer.destroy();
                                }
                                return prevUser.id !== leaveUser.id;
                            }),
                        );
                    });
                })
                .catch(() => {
                    console.error('Нет доступа к микрофону');
                });
        }

        return () => {
            peers.forEach((obj) => {
                obj.peer.destroy();
            });
        };
    }, [socket, roomId, user]);

    return (
        <div>
            <Header />
            <div className="p-2 flex gap-4 flex-wrap">
                {users.map((user) => {
                    return <Speaker key={user.id} />;
                })}
            </div>
            <audio controls />
        </div>
    );
};

export default RoomDetail;
