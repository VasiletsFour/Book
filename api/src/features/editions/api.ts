export interface Edition {
    name: string;
    description: string;
    type: string;
    price: number;
    currency: string;
    date?: number;
    author_id: Array<string>;
    remove_book: boolean;
}

export interface EditionsWithId extends Edition{
    _id:string
}
export interface Query {
    page: number;
    sortBy?:any
    authorName?: string;
    word?: string;
    min?:number,
    max?:number
    type: "book" | "news";
    currency?: "rub" | "dolar";
}
