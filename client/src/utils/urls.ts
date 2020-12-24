import { createPath } from "rd-url-utils";

export const ROOT_URL = createPath("/");
export const BOOKS = createPath("/books");
export const BOOK = createPath<{ id: string }>("/book/:id");
export const SHOPING = createPath("/shoping");
