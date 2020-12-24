export interface TokenInfo {
  token?: string;
  refreshToken?: string;
}

export const setToken = (token: TokenInfo) =>
  window.localStorage.setItem("token", JSON.stringify(token));
export const getToken = () => window.localStorage.getItem("token");
export const removeToken = () => window.localStorage.removeItem("token");
export const getBookStorage = () => {
  const books = window.localStorage.getItem("book");

  if (books) {
    return JSON.parse(books);
  }

  return [];
};

export const setBookStorage = (book: string) => {
  let include = false;
  const newBook = getBookStorage() || [];

  if (newBook.length !== 0) {
    include = newBook.includes(book);
  }

  !include && newBook.push(book);

  window.localStorage.setItem("book", JSON.stringify(newBook));
};
