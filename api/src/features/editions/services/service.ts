import { isValidated } from "../../../helpers/validate/validate";
import { logger } from "../../utils/logger";
import { Edition, Query } from "../api";
import * as repositore from "../repositories/repositorie";
import BookSchema from "../Schema/BookSchema.json";
import UpdateSchema from "../Schema/UpdateSchema.json";

export const books = async ({ page, word, authorName, sortBy, min, max, type, currency }: Query) => {
    logger.info(`>>>> bookService.books`);
    let date;
    let price;

    !word && (word = "");
    !min && (min = 0);
    !max && (max = 10000);

    switch (sortBy) {
        case undefined:
            break;
        case "date":
            date = -1;
            break;
        case "price:low":
            price = -1;
            break;
        case "price:high":
            price = 1;
            break;
    }

    return await repositore.books(page, word, authorName, price, date, Number(min), Number(max), type, currency);
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
