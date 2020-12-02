import { Request, Response } from "express"
import User from "../shared/db-models/user-models"

export const user = async (req: Request, res: Response) => {
    const user = await User.find().sort({ name: 1 })

    res.send(user).status(200)
}
export const userFind = async (req: Request, res: Response) => {
    const word = new RegExp (req.body.word, "i")
    const query = await User.find({ name: { $regex: word } }).sort({name:1})     
    
    res.send(query)
}