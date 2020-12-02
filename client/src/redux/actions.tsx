export const book = (books: any) => ({ type: "BOOK", data: books })
export const addProduct = () => ({ type: "ADDPRODUCT" })
export const removeBook = (book:any) => ({type: "REMOVE", data: book })
export const addBook = (book:any) => ({type: "ADDBOOK", data: book })
export const role = (role: any) => ({ type: "ROLE", data: role })
export const token = (auth:any, ref:any) => ({type:"TOKEN", authToken: auth, refToken: ref})
export const shop = (arr:any) => ({type: "SHOP", data: arr})

