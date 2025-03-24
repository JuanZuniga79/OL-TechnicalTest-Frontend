import {AxiosResponse} from "axios";

interface IGetConfig {
    dataAttribute: string;
}

export interface IClientRequest {
    get(url: string, token: string): Promise<AxiosResponse>;
    getFile(url: string, token: string): Promise<AxiosResponse>;
    post<T>(url: string, data: T, token: string): Promise<AxiosResponse>;
    put<T>(url: string, data: T, token: string): Promise<AxiosResponse>;
    patch(url: string, token: string): Promise<AxiosResponse>;
    delete(url: string, token: string): Promise<AxiosResponse>;
}

export default interface IRequest {
    withoutAuthPost<T>(url: string, data: T): Promise<AxiosResponse>
    get(url: string, config?: IGetConfig): Promise<AxiosResponse>
    post<T>(url: string, data: T): Promise<AxiosResponse>
}