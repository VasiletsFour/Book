import { isValidated } from "../../helpers/validate/validate";
import BookRequestSchema from "../printing-editions/operations/BookRequestSchema.json";
import { createBook } from "../printing-editions/saved-book";
import {logger} from "../utils/logger";

export async function create(book: object) {
    logger.info(`>>>> bookService.create() with: book = ${book}`);
    const validationResult = isValidated(book, BookRequestSchema);

    if (!validationResult.valid) {
        logger.error(`>>>> bookService.create(), invalid daata: ${validationResult.errors}`)
    }

    const result = await createBook(book);

    if (!result) {
        logger.error(`>>>> bookService.create(), result = ${result}`);
        return "book wasn\'t create"
    }
    return result
}