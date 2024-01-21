import axios, { AxiosInstance, AxiosResponse } from "axios";

export class ApiConnection 
{
    public static BASE_URL = import.meta.env.VITE_API_BASE_URL;
    public static AUTH_TOKEN_NAME = 'authorization';

    private axiosInstance : AxiosInstance;

    constructor() 
    {
        const authToken = localStorage.getItem(ApiConnection.AUTH_TOKEN_NAME);

        const headers : any = {};
        headers[ApiConnection.AUTH_TOKEN_NAME] = authToken;

        this.axiosInstance = axios.create({
            baseURL: ApiConnection.BASE_URL,
            headers
        });
    }

    get(url: string) : Promise<AxiosResponse<any, any>> 
    {
        return this.axiosInstance.get(url)
            .catch(unauthorizedErrorHandler);
    }

    post(url: string, data?: any) : Promise<AxiosResponse<any, any>> 
    {
        return this.axiosInstance.post(url, data)
            .catch(unauthorizedErrorHandler);
    }

    put(url: string, data?: any) : Promise<AxiosResponse<any, any>> 
    {
        return this.axiosInstance.put(url, data)
            .catch(unauthorizedErrorHandler);
    }

    delete(url: string) : Promise<AxiosResponse<any, any>> 
    {
        return this.axiosInstance.delete(url)
            .catch(unauthorizedErrorHandler);
    }
}

function unauthorizedErrorHandler(error: any)
{
    if (axios.isAxiosError(error))
    {
        if (error.response?.status === 401)
        {
            localStorage.removeItem(ApiConnection.AUTH_TOKEN_NAME);
            window.location.href = "/login";
        }
    }

    return Promise.reject(error);
}