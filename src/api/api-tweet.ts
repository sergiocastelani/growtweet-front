import { AxiosResponse } from "axios";
import { ApiConnection } from "./api-connection";
import { TweetDisplayInfosDTO } from "./dto/tweet-dtos";

export class ApiTweet extends ApiConnection 
{
    constructor()
    {
        super();
    }

    async all() : Promise<AxiosResponse<TweetDisplayInfosDTO,any>>
    {
        return super.get('/tweet/all');
    }

    async replies(tweetId: number) : Promise<AxiosResponse<TweetDisplayInfosDTO,any>>
    {
        return super.get(`/tweet/replies/${tweetId}`);
    }

    async fromUserId(userId: number) : Promise<AxiosResponse<TweetDisplayInfosDTO,any>>
    {
        return super.get(`/tweet/user/${userId}`);
    }

    async create(content: string)
    {
        return super.post('/tweet', {content});
    }

    async reply(replyId: number, content: string)
    {
        return super.post(`/reply/${replyId}`, {content});
    }

    async like(id: number)
    {
        return super.post(`/like/${id}`);
    }

    async unlike(id: number)
    {
        return super.delete(`/like/${id}`);
    }
}
