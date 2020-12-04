import AuthorModels from "../../../db/models/AuthorModels";
import EditionsModels from "../../../db/models/EditionsModels";
import { pagination } from "../../../helpers/pagination/pagination";
import { timeStempCreate } from "../../../helpers/timeStemp/timeStemp";
import { Edition } from "../api";

export const books = async (
    page: number,
    name?: string,
    authorName?: string,
    date?: number,
    price?: number,
    type?: string,
    currency?: string
) => {
    try {
        // let authors = null;
        const { start, limit } = pagination(10, Number(page));

        // if (authorName) {
        //     authors = await AuthorModels.find({ name: authorName }).map((item: any) => {
        //         return { _id: item._id };
        //     });
        // }

        const sort = { $sort: price?{price}:date?{date}:{name:1} } 
        
        const match = {
            $match: {
                // name: name && {
                //           $regex: name,
                //           $options: "i"
                // },
                // type:type,
                // currency:currency,
                // author_id: { $in: authors },
                remove_book: false
            }
        };

        const lookUp = {
            $lookup: {
                from: "authors",
                // localField: "_id",
                // foreignField: "author_id",
                let: { author_id: "$author_id", id: "$_id" },
                pipeline: [
                    { $match: { $expr: { $in: ["$_id","$$author_id"]}, remove_author: false  } },
                    { $project: { _id: false, id: "$_id", name: "$name" } }
                ],
                as: "author"
            }
        };

        const project = {
            $project: {
                _id: false,
                id: "$_id",
                name: "$name",
                description: "$description",
                type: "$type",
                price: "$price",
                currency: "$currency",
                author: "$author"
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
