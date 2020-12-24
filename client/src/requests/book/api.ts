export interface BookApi{
    id: string,
    name: string,
    description: string,
    type: "book"| "news",
    price: number,
    currency: string,
    author: Array<BookAuthor>
}

export interface BookAuthor{
    id:string
    name:string
}

export interface ShopingBody{
    shoping:Array<string>
}