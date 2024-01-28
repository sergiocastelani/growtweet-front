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
                localStorage.setItem(ApiConnection.AUTH_TOKEN_NAME, data?.token);
                localStorage.setItem('id', data.id.toString());
                localStorage.setItem('name', data.name);
                localStorage.setItem('email', data.email);
                return response;
            });
    }

    async logout()
    {
        return super.post('/auth/logout')
            .then((response) => {
                localStorage.removeItem(ApiConnection.AUTH_TOKEN_NAME);
                localStorage.removeItem('id');
                localStorage.removeItem('name');
                localStorage.removeItem('email');
                return response;
            });
    }
}