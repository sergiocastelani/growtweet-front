import { AxiosResponse } from "axios";
import { ApiConnection } from "./api-connection";
import { UserDisplayInfoDTO, UserRegistration, UserUpdateRequest } from "./dto/user-dtos";
import { ApiAuth } from "./api-auth";
import { AuthTokenDTO, UserAuthInfo, UserAuthInfoDTO } from "./dto/auth-dtos";

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

    async create(user: UserRegistration) : Promise<UserAuthInfo>
    {
        return super.post(`/user`, user)
            .then((response: AxiosResponse<UserAuthInfoDTO>) => 
            {
                return response.data.data;
            });
    }

    async update(user: UserUpdateRequest) : Promise<UserAuthInfo>
    {
        return super.put(`/user`, user)
            .then((response: AxiosResponse<AuthTokenDTO>) => 
            {
                return ApiAuth.setLoggedUser(response.data.data);
            });
    }
}
