import { Request, Response } from "express";
import { Filter } from "../api";
import * as service from "../services/service";

export const authors = (req: Request, res: Response) => {
    const { name, page }: Filter = req.query;

    service
        .authors(page, name)
        .then((result) => res.status(result["status"]).send(result["message"]))
        .catch((err) => res.send(err));
};

export const create = (req: Request, res: Response) => {
    service
        .create(req.body)
        .then((result) => res.status(result["status"]).send(result["message"]))
        .catch((err) => res.send(err));
};

export const update = (req: Request, res: Response) => {
    const id = req.params.id;
    const { name } = req.body;

    service
        .update(id, name)
        .then((result) => res.status(result["status"]).send(result["message"]))
        .catch((err) => res.send(err));
};

export const del = (req: Request, res: Response) => {
    const id = req.params.id;

    service
        .del(id)
        .then((result) => res.status(result["status"]).send(result["message"]))
        .catch((err) => res.send(err));
};
