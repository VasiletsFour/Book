import { Document, model, Schema } from "mongoose";
import { Order } from "../../features/orders/api";

const OrderSchema = new Schema({
    date: {
        type: Number,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    items: {
        printing_editions_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref:"Edition"
        },
        count: {
            type: Number,
            required: true
        }
    },
    payment_info: {
        transaction_id: String
    }
});

interface OrderModel extends Order, Document {}
export default model<OrderModel>("Order", OrderSchema);
