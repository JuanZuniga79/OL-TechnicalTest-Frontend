import axios from 'axios'
import {withAuthInterceptor} from "@/api/interceptors/withAuth.interceptor";

export const agent = axios.create({
    adapter: "fetch",
    baseURL: process.env.API_URL,
});

const authAgent = axios.create({
    adapter: "fetch",
    baseURL: process.env.API_URL,
});

export const clientAuthAgent = axios.create({
    adapter: "fetch",
    baseURL: process.env.NEXT_PUBLIC_API_URL,

})

clientAuthAgent.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

authAgent.interceptors.request.use(withAuthInterceptor);

export default authAgent;