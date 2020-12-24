import mongoose from "mongoose";
import AuthorModels from "../../../db/models/AuthorModels";
import EditionsModels from "../../../db/models/EditionsModels";
import { pagination } from "../../../helpers/pagination/pagination";
import { timeStempCreate } from "../../../helpers/timeStemp/timeStemp";
import { Edition } from "../api";
import { lookUp, project } from "../pipeline";

export const books = async (
    page: number,
    word?: string,
    authorName?: string,
    price?: number,
    date?: number,
    min?: number,
    max?: number,
    type?: string,
    currency?: string
) => {
    try {
        let authors = null;
        const any = { $exists: true };
        const { start, limit } = pagination(10, Number(page));

        const sort = { $sort: date ? { date } : price ? { price } : { date: 1 } };

        const match = {
            $match: {
                name: {
                    $regex: word,
                    $options: "i"
                },
                price: { $gte: min, $lte: max },
                // type:type,
                currency: currency ? currency : any,
                // author_id: { $in: authors },
                remove_book: false
            }
        };

        const result = await EditionsModels.aggregate([
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

export const book = async (id: string) => {
    try {
        const result = await EditionsModels.find({_id:id, remove_book: false}).populate("author_id")

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

export const shoping = async (shoping: Array<string>) => {
    try {
        const result = await EditionsModels.find({_id:{$in:shoping}}).populate("author_id")
        
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

export const create = async (book: Edition) => {
    try {
        const date = timeStempCreate();
        const createEditions = new EditionsModels({ date, ...book });

        await EditionsModels.create(createEditions);

        return {
            status: 200,
            message: {
                data: "Boook create"
            }
        };
    } catch (err) {
        return { status: 400, message: { error: err } };
    }
};

export const update = async (update: Edition, id: string) => {
    try {
        await EditionsModels.findByIdAndUpdate(id, update);

        return {
            status: 200,
            message: {
                data: "Boook update"
            }
        };
    } catch (err) {
        return { status: 400, message: { error: err } };
    }
};

export const delBook = async (id: string) => {
    try {
        await EditionsModels.findByIdAndUpdate(id, { remove_book: true });

        return {
            status: 200,
            message: {
                data: "Boook Deleate"
            }
        };
    } catch (err) {
        return { status: 400, message: { error: err } };
    }
};
