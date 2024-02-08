import { AxiosResponse } from "axios";
import { ApiConnection } from "./api-connection";
import { UserDisplayInfoDTO, UserRegistration, UserUpdateRequest } from "./dto/user-dtos";
import { UserAuthInfoDTO } from "./dto/auth-dtos";
import { ApiAuth } from "./api-auth";

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
        return super.post(`/user`, user)
            .then((response) => {
                ApiAuth.setLoggedUser(response.data.data);
                return response;
            });
    }

    async update(user: UserUpdateRequest) : Promise<AxiosResponse<UserAuthInfoDTO,any>>
    {
        return super.put(`/user`, user)
            .then((response) => {
                ApiAuth.setLoggedUser(response.data.data);
                return response;
            });
    }
}
