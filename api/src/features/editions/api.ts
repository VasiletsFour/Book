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

export interface Query {
    page: number;
    authorName?: string;
    word?: string;
    min?:number,
    max?:number
    date?: "asc" | "desc" | number;
    price?: "asc" | "desc" | number;
    type: "book" | "news";
    currency: "rub" | "dolar";
}
