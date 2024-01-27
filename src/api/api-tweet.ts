import { ApiConnection } from "./api-connection";

export class ApiTweet extends ApiConnection 
{
    constructor()
    {
        super();
    }

    async all()
    {
        return await super.get('/tweet/all');
    }

    async create(content: string)
    {
        return await super.post('/tweet', {content});
    }
}
