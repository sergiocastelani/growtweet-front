import { AxiosResponse } from "axios";
import { ApiConnection } from "./api-connection";
import { DailyVisitDTO, VisitTotalDTO } from "./dto/visit-dtos";

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

    /** All-time visit count (GET /visits/total). Rejects on any non-2xx status or a network error. */
    async total() : Promise<number>
    {
        return super.get('/visits/total')
            .then((response: AxiosResponse<VisitTotalDTO>) =>
            {
                return response.data.data.total;
            });
    }
}
