import { isValidated } from "../../../helpers/validate/validate";
import { logger } from "../../utils/logger";
import { Edition, Query } from "../api";
import * as repositore from "../repositories/repositorie";
import BookSchema from "../Schema/BookSchema.json";
import UpdateSchema from "../Schema/UpdateSchema.json";

export const books = async ({ page, word, authorName, date, min, max, price, type, currency }: Query) => {
    logger.info(`>>>> bookService.books`);

    !word && (word = "");
    !min && (min = 0);
    !max && (max = 10000);

    switch (date) {
        case "asc":
            date = 1;
            break;
        case "desc":
            date = -1;
            break;
    }
    switch (price) {
        case "asc":
            price = 1;
            break;
        case "desc":
            price = -1;
            break;
    }

    return await repositore.books(page, word, authorName, date, Number(min), Number(max), price, type, currency);
};

export const book = async (id: string) => {
    logger.info(`>>>> bookService.find book = ${id}`);
    if (!id) {
        logger.error("find Book, error: not found id");
        return { status: 400, message: { error: "Not found id " } };
    }

    return await repositore.book(id);
};

export const create = async (book: Edition) => {
    logger.info(`>>>> bookService.create book = ${book.name}`);
    const validate = isValidated(book, BookSchema);

    if (!validate.valid) {
        logger.error(`create Book, error: ${validate.errors}, book = ${JSON.stringify(book)}`);
        return { status: 400, message: { error: validate.errors } };
    }

    return await repositore.create(book);
};

export const update = async (update: Edition, id: string) => {
    if (!id) {
        return { status: 404, message: { error: "Id not found" } };
    }

    logger.info(`>>>> bookService.update book = ${update.name}`);

    const validate = isValidated(update, UpdateSchema);

    if (!validate.valid) {
        logger.error(`update Book, error: ${validate.errors}, book = ${JSON.stringify(update.name)}`);
        return { status: 400, message: { error: validate.errors } };
    }

    return await repositore.update(update, id);
};

export const delBook = async (id: string) => {
    if (!id) {
        return { status: 404, message: { error: "Id not found" } };
    }

    return await repositore.delBook(id);
};
