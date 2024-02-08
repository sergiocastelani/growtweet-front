import { CommonResponse } from "./common-response";

export interface UserRegistration 
{
    username: string;
    email: string;
    name: string;
    password: string;
    pictureUrl: string | null;
}

export interface UserDisplayInfo
{
    id: number;
    username: string;
    name: string;
    pictureUrl: string;
}

export type UserDisplayInfoDTO = CommonResponse<UserDisplayInfo>;

export interface UserUpdateRequest 
{
    username: string;
    email: string;
    name: string;
    currentPassword: string;
    newPassword?: string;
    pictureUrl?: string;
}

