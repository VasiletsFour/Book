export interface Order {
    date: number;
    user_id: string;
    items: Item;
    payment_info: PaymentInfo;
}

interface Item {
    printing_editions_id: string;
    count: number;
}

interface PaymentInfo {
    transaction_id: string;
}

export interface CreateOrder extends PaymentInfo, Item{}