import { AxiosResponse } from "axios";
import { ApiConnection } from "./api-connection";
import { DailyVisit, DailyVisitDTO, DailyVisitListDTO } from "./dto/visit-dtos";

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

    /** The last `last` registered days, newest first (GET /visits?last=N). Rejects on any non-2xx status or a network error. */
    async list(last: number) : Promise<DailyVisit[]>
    {
        return super.get('/visits', { params: { last } })
            .then((response: AxiosResponse<DailyVisitListDTO>) =>
            {
                return response.data.data;
            });
    }
}
