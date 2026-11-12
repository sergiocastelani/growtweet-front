import { AxiosResponse } from "axios";
import { ApiConnection } from "./api-connection";
import { DailyVisitDTO } from "./dto/visit-dtos";

export class ApiVisit extends ApiConnection
{
    constructor()
    {
        super();
    }

    /** Counts one visit (POST /visits). Resolves on 2xx; rejects on any other status or a network error. */
    async register() : Promise<void>
    {
        await (super.post('/visits') as Promise<AxiosResponse<DailyVisitDTO>>);
    }
}
