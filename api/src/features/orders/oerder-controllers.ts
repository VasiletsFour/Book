import { Request, Response } from "express"
import Order from "../shared/db-models/order-models"
import { create } from "./order-service";

export const newOrder = async (req: Request, res: Response) => {
    const service = await create(req.body)

    res.send(service)
}

export const order = async (req: Request, res: Response) => {
    const orders = await Order.find()

    res.json(orders).status(200)
}