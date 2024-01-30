import { AxiosResponse } from "axios";
import { ApiConnection } from "./api-connection";
import { UserDisplayInfoDTO, UserRegistration } from "./dto/user-dtos";
import { UserAuthInfoDTO } from "./dto/auth-dtos";

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

    async create(user: UserRegistration) : Promise<AxiosResponse<UserAuthInfoDTO,any>>
    {
        return super.post(`/user`, user);
    }
}
