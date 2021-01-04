export interface User {
    username: string;
    email: string;
    password: string;
    role: "admin" | "user";
    remover_user: boolean;
}


export interface Login {
    email: string;
    password: string;
}
export interface SignUp extends Login {
    username: string;
}

