import React, {useState} from 'react';
import { io, Socket } from 'socket.io-client';
import {useCookies} from "next-client-cookies";
import {getUserProfile} from "@/api/auth";

export const useSocket = () => {
    const cookies = useCookies();
    const [user, setUser] = useState()
    const socketRef = React.useRef<Socket>();

    if (!socketRef.current) {
        // @ts-ignore
        socketRef.current = typeof window !== 'undefined' && io('http://localhost:8000', {
            extraHeaders: {
                "Authorization": `Bearer ${cookies.get("token")}`
            }
        });
    } else {
        socketRef.current.connect();
    }

    React.useEffect(() => {
        getUserProfile(cookies.get("token")).then((data) => {
            // @ts-ignore
            return setUser(data);
        })
        return () => {
            if (socketRef.current) {
                console.log('disconnect!!!');
                socketRef.current.disconnect();
            }
        };
    }, []);

    // @ts-ignore
    return [socketRef.current, user];
};
