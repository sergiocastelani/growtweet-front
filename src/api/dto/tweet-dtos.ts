import { CommonResponse } from "./common-response";
import { UserDisplayInfo } from "./user-dtos";

export interface Tweet 
{
    id: number;
    userId: number;
    repliedId: number | null;
    content: string;
    createdAt: string;
}

export type TweetDTO = CommonResponse<Tweet>;
export type TweetsDTO = CommonResponse<Tweet[]>;

export interface TweetDisplayInfo
{
    id: number;
    repliedId: number | null;
    content: string;
    createdAt: string;
    totalReplies: number;
    totalLikes: number;
    user: UserDisplayInfo;
}

export type TweetDisplayInfoDTO = CommonResponse<TweetDisplayInfo>;
export type TweetDisplayInfosDTO = CommonResponse<TweetDisplayInfo[]>;
