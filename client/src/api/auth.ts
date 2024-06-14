import {HttpException, instance} from "@/api/index";


export type signInFetchPayload = {
    email: string
    password: string
}
export type UserType = {
    id: number
    email: string
    firstname: string
    lastname: string
}

export const signInFetch = async (payload: signInFetchPayload): Promise<any> => {
    try {
        const data = await instance.post("/auth/login", payload);
        return data.data;
    } catch (err) {
        return err;
    }
}
export type signUpFetchPayload = {
    email: string
    password: string
    firstname: string
    lastname: string
}
export const signUpFetch = async (payload: signUpFetchPayload): Promise<any> => {
    try {
        const data = await instance.post("/auth/register", payload);
        return data.data;
    } catch (err) {
        return err;
    }
}

export const getUserProfile = async (token: any): Promise<UserType | HttpException> => {
    try {
        const data = await instance.get("/auth/profile", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return data.data;
    } catch (err) {
        return err.data;
    }
}
