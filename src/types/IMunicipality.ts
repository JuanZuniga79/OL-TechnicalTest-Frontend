export interface Municipality {
    id: number;
    name: string;
    country_id: number;
}

export default interface Country {
    id: number;
    name: string;
    code: number;
    municipalities: Municipality[];
}