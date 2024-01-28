import { CommonResponse } from "./common-response";

export interface Tweet 
{
    id: number;
    userId: number;
    repliedId: number | null;
    content: string;
    picture: string | null;
    createdAt: Date;
}

export type TweetDTO = CommonResponse<Tweet>;
export type TweetsDTO = CommonResponse<Tweet[]>;
