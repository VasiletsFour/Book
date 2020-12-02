import AuthorModel from "../../../db/models/AuthorModels";
import { pagination } from "../../../helpers/pagination/pagination";
import { Author, AuthorMap } from "../api";

export const authors = async (page: number, name?: string) => {
    try {
        const { start, limit } = pagination(10, Number(page));
        const filter = name && {
            name: {
                $regex: name,
                $options: "i"
            },
            remove_author: false
        };

        const result = await AuthorModel.find(filter).sort({ name: 1 }).skip(start).limit(limit);

        return {
            status: 200,
            message: {
                data: result.map((item: AuthorMap) => {
                    return {
                        id: item._id,
                        name: item.name
                    };
                })
            }
        };
    } catch (err) {
        return { status: 400, message: { error: err } };
    }
};

export const create = async (author: Author) => {
    try {
        const checkAuthor = await AuthorModel.findOne({ name: author.name });

        if (checkAuthor !== null) {
            return { status: 404, message: { error: "author already exists!" } };
        }

        const createAuthor = new AuthorModel(author);
        await AuthorModel.create(createAuthor);

        return {
            status: 200,
            message: {
                data: "Create author"
            }
        };
    } catch (err) {
        return { status: 400, message: { error: err } };
    }
};

export const update = async (id: string, name: string) => {
    try {
        await AuthorModel.findByIdAndUpdate(id, { name });

        return {
            status: 200,
            message: {
                data: "Update author"
            }
        };
    } catch (err) {
        return { status: 400, message: { error: err } };
    }
};

export const del = async (id: string) => {
    try {
        await AuthorModel.findByIdAndUpdate(id, { remove_author: true });

        return {
            status: 200,
            message: {
                data: "Del author"
            }
        };
    } catch (err) {
        return { status: 400, message: { error: err } };
    }
};
