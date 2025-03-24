'use server'
import {InternalAxiosRequestConfig} from "axios";
import {getSession} from "@/lib/session";
import {redirect} from "next/navigation";

export const withAuthInterceptor = async (config: InternalAxiosRequestConfig) =>  {
    const session = await getSession();
    if(!session || !session.toke) redirect("/login");
    config.headers.Authorization = `Bearer ${session.token}`;
    return config;
}