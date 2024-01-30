import { AxiosResponse } from "axios";
import { ApiConnection } from "./api-connection";
import { UserAuthInfo, UserAuthInfoDTO } from "./dto/auth-dtos";

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
                ApiAuth.setUserAsLoggedIn(response.data.data);
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

    static setUserAsLoggedIn(user: UserAuthInfo)
    {
        if (user.pictureUrl?.trim().length === 0)
            user.pictureUrl = null;

        localStorage.setItem('user', JSON.stringify(user));
    }
}