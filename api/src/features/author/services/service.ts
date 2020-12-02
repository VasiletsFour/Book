import { isValidated } from "../../../helpers/validate/validate";
import { logger } from "../../utils/logger";
import { Author } from "../api";
import * as rpositore from "../repositories/repositorie";
import AuthorSchema from "../Schema/AuthorSchema.json";

export const authors = async (page: number, name?: string) => {
    logger.info(`>>>> authorService.allAuthors: qury = ${name} ${page}`);

    return await rpositore.authors(page, name);
};

export const create = async (author: Author) => {
    logger.info(`>>>> authorService.create author = ${author}`);
    const validate = isValidated(author, AuthorSchema);

    if (!validate.valid) {
        logger.error(`create Author, error: ${validate.errors}, author = ${JSON.stringify(author)}`);
        return { status: 400, message: { error: validate.errors } };
    }

    return await rpositore.create(author);
};

export const update = async (id: string, name: string) => {
    logger.info(`>>>> authorService.update author = ${id}`);

    if (!name || !id) {
        logger.error(`update Author, error: not found author, author = ${id}`);
        return { status: 400, message: { error: "not found author" } };
    }

    return await rpositore.update(id, name);
};

export const del = async (id: string) => {
    logger.info(`>>>> authorService.delete author = ${id}`);

    if (!id) {
        logger.error(`update Author, error: not found author, author = ${id}`);
        return { status: 400, message: { error: "not found author" } };
    }

    return await rpositore.del(id);
};
