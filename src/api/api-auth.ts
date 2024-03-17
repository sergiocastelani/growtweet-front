import { AxiosResponse } from "axios";
import { ApiConnection } from "./api-connection";
import { UserAuthInfo, AuthTokenDTO } from "./dto/auth-dtos";
import { decodeToken } from "react-jwt";

export class ApiAuth extends ApiConnection 
{
    constructor()
    {
        super();
    }

    async login(email: string, password: string) : Promise<UserAuthInfo>
    {
        return super.post('/auth/login', {email, password})
            .then((response: AxiosResponse<AuthTokenDTO, any>) => 
            {
                return ApiAuth.setLoggedUser(response.data.data);
            });
    }

    async logout()
    {
        ApiAuth.unlogUser();
    }

    async check()
    {
        await super.get('/auth/check');
    }

    static setLoggedUser(token: string) : UserAuthInfo
    {
        const authInfo : UserAuthInfo | null = decodeToken(token);
        if (authInfo === null)
            throw new Error("Invalid login token");

        if (authInfo.pictureUrl?.trim().length === 0)
        authInfo.pictureUrl = null;

        localStorage.setItem('user', JSON.stringify(authInfo));
        localStorage.setItem('token', token);

        return authInfo;
    }

    static getLoggedUser() : UserAuthInfo | null
    {
        return JSON.parse(localStorage.getItem('user') ?? 'null');
    }

    static unlogUser() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
}