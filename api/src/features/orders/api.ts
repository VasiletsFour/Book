export interface Order{
    date:number,
    user_id:string,
    items:Array<{}>,
    payment_info:{
        transaction_id:string
    }
}