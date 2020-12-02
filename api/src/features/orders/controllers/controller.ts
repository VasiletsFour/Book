import { Request, Response } from "express"
import * as service from "../services/service";

export const create = (req: Request, res: Response) => {
    service.create(req.body).then((result)=>{res.status(result["stataus"]).send(result["message"])}).catch((err)=>res.send(err))
}

export const orders =(req: Request, res: Response) => {
    service.create(req.body).then((result)=>{res.status(result["stataus"]).send(result["message"])}).catch((err)=>res.
}