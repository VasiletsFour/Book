export interface User {
    username: string;
    email: string;
    password: string;
    role: "admin" | "user";
    remover_user: boolean;
}

export interface Login {
    username: string;
    password: string;
}
