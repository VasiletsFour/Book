import { Request, Response } from "express";
import { query } from "winston";
import * as service from "../services/service";

export const books = async (req: Request, res: Response) => {
    service
        .books(req.query)
        .then((result) => res.status(result["status"]).send(result["message"]))
        .catch((err) => res.send(err));
};

export const book = async (req: Request, res: Response) => {
    const { id } = req.params;

    service
        .book(id)
        .then((result) => res.status(result["status"]).send(result["message"]))
        .catch((err) => res.send(err));
};

export const create = async (req: Request, res: Response) => {
    service
        .create(req.body)
        .then((result) => res.status(result["status"]).send(result["message"]))
        .catch((err) => res.send(err));
};

export const update = async (req: Request, res: Response) => {
    const body = req.body;
    const { id } = req.params;

    service
        .update(body, id)
        .then((result) => res.status(result["status"]).send(result["message"]))
        .catch((err) => res.send(err));
};

export const delBook = async (req: Request, res: Response) => {
    const { id } = req.params;

    service
        .delBook(id)
        .then((result) => res.status(result["status"]).send(result["message"]))
        .catch((err) => res.send(err));
};
