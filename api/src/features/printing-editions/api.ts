export interface Edition {
    name: { type: string; unique: true };
    description: string;
    type: string;
    price: number;
    currency: string;
    author_id: string;
    remove_book: boolean;
}
