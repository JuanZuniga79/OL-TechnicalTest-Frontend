export interface IUserLogin {
    email: string;
    password: string;
}
export interface User {
    id: number;
    email: string;
    name: string;
    role: string;
}

export interface AuthResponse {
    user: User;
    access_token: string;
}