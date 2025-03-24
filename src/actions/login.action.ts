"use server"
import request from "@/api/request"
import {AuthResponse, IUserLogin} from "@/api/types/ISession.type";
import {createSession, deleteSession} from "@/lib/session";
import {redirect} from "next/navigation";

export async function createSessionAction(data: AuthResponse) {
    await createSession(data);
    return {
        message: "Redirigiendo",
    };
}

export default async function loginAction(data: {email: string, password: string}) {
    let error = ""
    const res =  await request.withoutAuthPost<IUserLogin>('/users/login', data)
        .then((res)=> {
            return res.data.data as AuthResponse;
        }).catch((err)=> {
            error = err.response.data.message as string;
            return undefined;
        })
    if(!res) throw Error(error);
    return res;
}

export async function logoutAction() {
    await deleteSession();
    redirect('/login');
}