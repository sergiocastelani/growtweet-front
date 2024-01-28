import { AxiosResponse } from "axios";
import { ApiConnection } from "./api-connection";
import { UserDisplayInfoDTO } from "./dto/user-dtos";

export class ApiUser extends ApiConnection 
{
    constructor()
    {
        super();
    }

    async byId(userId: number) : Promise<AxiosResponse<UserDisplayInfoDTO,any>>
    {
        return super.get(`/user/${userId}`);
    }

}
