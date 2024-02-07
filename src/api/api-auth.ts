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
        try {
            await super.post('/auth/logout');
        } finally {
            localStorage.removeItem('user');
        }
    }

    async check()
    {
        await super.get('/auth/check');
    }

    static setUserAsLoggedIn(user: UserAuthInfo)
    {
        if (user.pictureUrl?.trim().length === 0)
            user.pictureUrl = null;

        localStorage.setItem('user', JSON.stringify(user));
    }

    static getLoggedUser() : UserAuthInfo | null
    {
        return JSON.parse(localStorage.getItem('user') ?? 'null');
    }
}