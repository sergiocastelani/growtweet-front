import { CommonResponse } from "./common-response";

export interface UserAuthInfo
{
    id: number;
    email: string;
    name: string;
    token: string;
}

export type UserAuthInfoDTO = CommonResponse<UserAuthInfo>;
