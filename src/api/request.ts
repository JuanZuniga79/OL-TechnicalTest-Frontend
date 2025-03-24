import IRequest, {IClientRequest} from "./types/IRequest.type";
import authAgent, {agent, clientAuthAgent} from "./agent";
import {AxiosResponse} from "axios";

function isObjectEmpty<T>(obj: T): boolean {
    if (typeof obj !== "object" || obj === null) {
        throw new Error("El cuerpo de la peticion no es un objeto");
    }
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function validateRequest<T>(url: string, data?: T) {
    if (url === "") throw new Error("La url de la peticion esta vacia");
    if (data) {
        if (isObjectEmpty(data)) throw new Error("El objeto de datos esta vacio");
    }
}

export const clientRequest: IClientRequest = {
    put<T>(url: string, data: T, token: string): Promise<AxiosResponse> {
        validateRequest<T>(url, data);
        return clientAuthAgent.put<T>(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    post<T>(url: string, data: T, token: string): Promise<AxiosResponse> {
        validateRequest<T>(url, data);
        return clientAuthAgent.post<T>(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    getFile(url: string, token: string): Promise<AxiosResponse> {
        validateRequest(url);
        return clientAuthAgent.get(url, {
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'text/csv'
            }
        })
    },
    delete(url: string, token: string): Promise<AxiosResponse> {
        validateRequest(url);
        return clientAuthAgent.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    patch(url: string, token: string): Promise<AxiosResponse> {
        validateRequest(url);
        return clientAuthAgent.patch(url, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },
    get(url: string, token: string): Promise<AxiosResponse> {
        validateRequest(url)
        return clientAuthAgent.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
}

const request: IRequest = {
    async withoutAuthPost<T>(url: string, data: T) {
        validateRequest(url, data);
        return agent.post(url, data);
    },
    async get(url) {
        validateRequest(url);
        return authAgent.get(url);
    },
    async post<T>(url: string, data: T) {
        validateRequest(url);
        return authAgent.post(url, data);
    }
};

export default request;