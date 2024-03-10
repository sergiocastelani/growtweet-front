import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class ApiConnection 
{
    public static BASE_URL = import.meta.env.VITE_API_BASE_URL;
    public static AUTH_TOKEN_NAME = 'authorization';

    private axiosInstance : AxiosInstance;

    constructor() 
    {
        const headers : any = {};

        headers[ApiConnection.AUTH_TOKEN_NAME] = localStorage.getItem('token');

        this.axiosInstance = axios.create({
            baseURL: ApiConnection.BASE_URL,
            headers
        });
    }

    async get(url: string, config?: AxiosRequestConfig<any>)
    {
        return this.axiosInstance.get(url, config)
            .catch(unauthorizedErrorHandler);
    }

    async post(url: string, data?: any)
    {
        return this.axiosInstance.post(url, data)
            .catch(unauthorizedErrorHandler);
    }

    async put(url: string, data?: any)
    {
        return this.axiosInstance.put(url, data)
            .catch(unauthorizedErrorHandler);
    }

    async delete(url: string)
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
            localStorage.clear();
            window.location.href = '/login';
        }
    }

    return Promise.reject(error);
}