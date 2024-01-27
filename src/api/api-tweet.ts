import { AxiosResponse } from "axios";
import { ApiConnection } from "./api-connection";
import { TweetsDTO } from "./dto/tweet-types";

export class ApiTweet extends ApiConnection 
{
    constructor()
    {
        super();
    }

    async all() : Promise<AxiosResponse<TweetsDTO,any>>
    {
        return super.get('/tweet/all');
    }

    async create(content: string)
    {
        return super.post('/tweet', {content});
    }
}
