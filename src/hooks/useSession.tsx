import {useEffect} from "react";
import {AuthResponse} from "@/api/types/ISession.type";
import {getSession} from "@/lib/session";
import sessionStore from "@/store/session.store";

export default function useSession() {
    const { data, setData } = sessionStore();

    useEffect(() => {
        if(data !== undefined) return;
        (async () => {
            const session = await getSession();
            if (!session) return;
            if (!session.data) return;
            const data = session.data as AuthResponse;
            setData(data);
        })();
    }, [data]);

    return {
        data,
    };
}