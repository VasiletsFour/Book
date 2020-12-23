import { BookApi } from "../requests/book/api";

export const books = (books: Array<BookApi>) => ({
  type: "BOOKS",
  data: books,
});
export const book = (book: BookApi) => ({ type: "BOOK", data: book });
export const shoping = (book: BookApi) => ({ type: "SHOPING", data: book });
export const role = (role: string) => ({ type: "ROLE", data: role });
