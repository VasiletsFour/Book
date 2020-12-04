export interface Token {
    id?: string;
    role?: string;
    type?: "access" | "refresh";
}
