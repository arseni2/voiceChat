import {UserType, getUserProfile} from "@/api/auth";
import { cookies } from "next/headers";


export const checkAuth = async (): Promise<null | UserType> => {
    const token = cookies().get("token")?.value
    if(!token) return null

    let user = await getUserProfile(token)
    if(user?.statusCode) return null
    return user
}