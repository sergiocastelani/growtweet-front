import { ApiConnection } from "./api-connection";

export class ApiTweet extends ApiConnection 
{
    constructor()
    {
        super();
    }

    async all()
    {
        return super.post('/tweet/all')
            .then((response) => {
                return response;
            });
    }
}
