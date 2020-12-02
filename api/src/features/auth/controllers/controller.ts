import { Request, Response } from "express";
import * as service from "../services/service";

export const signUp = (req: Request, res: Response) => {
    service
        .signUp(req.body)
        .then((result) => res.status(result["status"]).send(result["message"]))
        .catch((err) => res.send(err));
};

export const signIn = async (req: Request, res: Response) => {
    service
        .signIn(req.body)
        .then((result) => res.status(result["status"]).send(result["message"]))
        .catch((err) => res.send);
};
