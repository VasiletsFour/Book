import { Request, Response } from "express";
import * as service from "../services/service";

export const create = (req: Request, res: Response) => {
    const auth = req.header("Authorization");

    service
        .create(req.body, auth)
        .then((result) => {
            res.status(result["status"]).send(result["message"]);
        })
        .catch((err) => res.send(err));
};

export const orders = (req: Request, res: Response) => {
    const {id, page} = req.query

    service
        .orders(page, id)
        .then((result) => {
            res.status(result["status"]).send(result["message"]);
        })
        .catch((err) => res.send(err));
};
