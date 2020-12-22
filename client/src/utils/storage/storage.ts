import {BookApi  } from "../../requests/book";

export interface TokenInfo {
    token?: string;
    refreshToken?: string;
}

export const setToken = (token: TokenInfo) => window.localStorage.setItem("token", JSON.stringify(token));
export const getToken = (): any => window.localStorage.getItem("token");
export const removeToken = () => window.localStorage.removeItem("token");
export const getBook = () => window.localStorage.getItem("book")
export const setBook = (book:BookApi)=> window.localStorage.setItem