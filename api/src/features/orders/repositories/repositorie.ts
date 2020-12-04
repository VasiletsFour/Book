import mongoose from "mongoose";
import OrderModel from "../../../db/models/OrderModels";
import { pagination } from "../../../helpers/pagination/pagination";
import { tokenDecode } from "../../../helpers/token/token";
import { timeStempCreate } from "../../../helpers/timeStemp/timeStemp";
import { CreateOrder } from "../api";

export const create = async (order: CreateOrder, auth: string) => {
    try {
        const token = await tokenDecode(auth);
        const userId = token.id;
        const date = timeStempCreate();

        const createOrder = new OrderModel({ date, userId, ...order });
        await OrderModel.create(createOrder);

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

export const orders = async (page: number, id?: string) => {
    try {
        const { start, limit } = pagination(10, Number(page));
        const sort = { sort: { date: -1 } };

        const match = id?{
            $match: {
                userId: mongoose.Types.ObjectId(id)
            }
        }:{};

        const lookUp = {
            $lookup: {
                from: "users",
                let: { userId: "$userId", id: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
                    { $project: { _id: false, id: "$_id", username: "$username", email: "$email" } }
                ],
                as: "user"
            }
        };

        const project = {
            $project: {
                _id: false,
                id: "$_id",
                payment_info: "$payment_info.transaction_id",
                user: {
                    id: { $arrayElemAt: ["$user.id", 0] },
                    username: { $arrayElemAt: ["$user.username", 0] },
                    email: { $arrayElemAt: ["$user.email", 0] }
                }
            }
        };

        const result = await OrderModel.aggregate([
            match,
            lookUp,
            sort,
            project,
            { $skip: start },
            { $limit: limit }
        ]);

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
