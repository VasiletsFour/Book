import OrderModel from "../../../db/models/OrderModels";
import { pagination } from "../../../helpers/pagination/pagination";
import { CreateOrder } from "../api";
import mongoose from "mongoose";

export const create = async (order: CreateOrder, auth?:string) => {
    try {
        

        
        return {
            status: 200,
            message: {
                data: "Crerate Order"
            }
        };
    } catch (err) {
        return { status: 400, message: { error: err } };
    }
};

export const orders = async (page: number, id?:string) => {
    try {
        const { start, limit } = pagination(10, Number(page));
         await OrderModel.find(id && {userId:id}).sort({ date: -1 }).skip(start).limit(limit);
        const match = {$match:{
            userId:mongoose.Types.ObjectId(id)
        }}
        
        const lookUp = {
            $lookup:{
                from: "users",    
                let: { userId: "$userId", id: "$_id"},       
                pipeline: [
                    { $match:
                        { $expr:{ $eq: [ "$_id",  "$$userId" ] }}
                    },
                    { $project: {  _id: false, id:"$_id",  username:"$username", email:"$email" } }
                 ],
                as: "user"
            }
        }

        const project = {$project:{
            _id:false,
            id:"$_id",
            payment_info: "$payment_info.transaction_id",
            user:{
                id: { $arrayElemAt: [ "$user.id", 0 ] },
                username: { $arrayElemAt: [ "$user.username", 0 ] }, 
                email:{ $arrayElemAt: [ "$user.email", 0 ] }
            }
        }}

        const result = await OrderModel.aggregate([id&&match,lookUp, project])
        
        return {
            status: 200,
            message: {
                data: result
            }
        };
    } catch (err) {
        return { status: 400, message: { error: err } };
    }
};