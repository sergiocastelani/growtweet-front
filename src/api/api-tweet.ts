import { AxiosResponse } from "axios";
import { ApiConnection } from "./api-connection";
import { TweetDisplayInfosDTO, TweetsDTO } from "./dto/tweet-dtos";

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

    async create(content: string)
    {
        return super.post('/tweet', {content});
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
