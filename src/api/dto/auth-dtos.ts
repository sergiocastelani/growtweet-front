import { CommonResponse } from "./common-response";

export interface UserAuthInfo
{
    id: number;
    username: string;
    email: string;
    name: string;
    token: string;
    pictureUrl: string;
}

export type UserAuthInfoDTO = CommonResponse<UserAuthInfo>;
