export interface Establishment {
    id: number;
    name: string;
    income: string;
    employees: number;
}

export default interface Merchant {
    id: number;
    name: string;
    status: string;
    phone?: string;
    email?: string;
    country: string;
    municipality: string;
    registered_at: string;
    establishments: Establishment[];
}

export interface CreateEstablishment {
    name: string;
    income: number;
    employees: number;
}

export interface CreateMerchant {
    name: string;
    email?: string;
    phone?: string;
    municipality_id: number;
    registered_at: string;
    status_id: number;
    establishments: Establishment[];
}