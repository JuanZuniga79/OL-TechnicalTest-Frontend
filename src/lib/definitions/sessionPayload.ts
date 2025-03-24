import {AuthResponse} from "@/api/types/ISession.type";

export interface SessionPayload {
    data: AuthResponse,
    expiresAt: Date
}