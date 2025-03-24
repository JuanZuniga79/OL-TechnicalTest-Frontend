import {create} from 'zustand';
import {AuthResponse} from "@/api/types/ISession.type";

interface SessionStore {
    data: AuthResponse | undefined;
    setData: (data: AuthResponse) => void;
}

const sessionStore = create<SessionStore>()((set)=> ({
    data: undefined,
    setData: (data: AuthResponse) => set({data}),
}))

export default sessionStore;