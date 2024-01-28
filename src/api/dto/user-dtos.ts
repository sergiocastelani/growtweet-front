import { CommonResponse } from "./common-response";

export interface UserDisplayInfo
{
    id: number;
    username: string;
    name: string;
    pictureUrl: string;
}

export type UserDisplayInfoDTO = CommonResponse<UserDisplayInfo>;
