import { Schema, model } from "mongoose";

export interface IOrder extends Document{

}

const orderSchema = new Schema({
    date:{
        type:Date,
        required:true
    },
    user_id:{
        type:Schema.Types.ObjectId, 
        required: true
    },
    items:{
        printing_editions_id:{
            type: Schema.Types.ObjectId,
            required:true
        },
        count:{
            type:Number,
            required:true
        }
    },
    payment_info:{
        transaction_id:{}
    }
})

export default model("Order", orderSchema)