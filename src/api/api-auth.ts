import { AxiosResponse } from "axios";
import { ApiConnection } from "./api-connection";
import { UserAuthInfoDTO } from "./dto/auth-dtos";

export class ApiAuth extends ApiConnection 
{
    constructor()
    {
        super();
    }

    async login(email: string, password: string) : Promise<AxiosResponse<UserAuthInfoDTO, any>>
    {
        return super.post('/auth/login', {email, password})
            .then((response: AxiosResponse<UserAuthInfoDTO, any>) => {
                const data = response.data?.data;
                if (data?.pictureUrl?.trim().length === 0)
                    data.pictureUrl = null;

                localStorage.setItem('user', JSON.stringify(data));
                return response;
            });
    }

    async logout()
    {
        return super.post('/auth/logout')
            .then((response) => {
                localStorage.removeItem('user');
                return response;
            });
    }
}