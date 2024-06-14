import {Request} from "@nestjs/common";

export type UserType = {id: number}
export type RequestWithUser = Request & {user: UserType}