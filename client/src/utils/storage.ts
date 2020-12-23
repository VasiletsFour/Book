export interface TokenInfo {
    token?: string;
    refreshToken?: string;
}

export const setToken = (token: TokenInfo) => window.localStorage.setItem("token", JSON.stringify(token));
export const getToken = () => window.localStorage.getItem("token");
export const removeToken = () => window.localStorage.removeItem("token");
export const getBook = () => { 
    const books = window.localStorage.getItem("book")

    if(books){
        return JSON.parse(books)
    }

    return null
}


export const setBook = (book:string)=> {
    const newBook =  getBook().push(book)

    window.localStorage.setItem("book", JSON.stringify(newBook))
}