import { Request, Response } from "express";
import * as service from "../services/service";

export const users = (req: Request, res: Response) => {
    const query = req.query;

    service
        .users(query)
        .then((result) => res.status(result["status"]).send(result["message"]))
        .catch((err) => res.send(err));
};
