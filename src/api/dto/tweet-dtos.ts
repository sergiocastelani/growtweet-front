import { CommonResponse } from "./common-response";

export interface Tweet {
    id: number;
    userId: number;
    repliedId: number | null;
    content: string;
}

export type TweetDTO = CommonResponse<Tweet>;
