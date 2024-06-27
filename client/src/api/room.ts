import {HttpException, instance} from "@/api/index";
import { cache } from 'react'
import {getCookieClient} from "@/utils/getCookie";
import {UserType} from "@/api/auth";


export type RoomType = {
    id: number
    title: string
    author: UserType
    password?: string
}
export const getAllRoomsFetch = cache( async (): Promise<RoomType[]> => {
    try {
        const data = await instance.get("/room/all");
        return data.data;
    } catch (err) {
        throw err;
    }
})

export type createRoomFetchPayloadType = {
    title: string
}
export const createRoomFetch = async (payload: createRoomFetchPayloadType): Promise<RoomType> => {
    try {
        const token = getCookieClient("token")
        const data = await instance.post("/room/create", payload, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return data.data;
    } catch (err) {
        throw err;
    }
}

export const deleteRoomFetch = async (id: number): Promise<RoomType | HttpException> => {
    try {
        const token = getCookieClient("token")
        const data = await instance.delete<RoomType | HttpException>(`/room/delete/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return data.data;
    } catch (err) {
        throw err;
    }
}