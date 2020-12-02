import { validateWithJsonSchema } from "../utils/validateWithJsonSchema";
import AuthorRequestSchema from "./operations/AuthorRequestSchema.json";
import { createAuthor } from "./saved-author";
import {logger} from "../utils/logger";

export async function create(author: object) {
    logger.info(`>>>> authorService.create() with: author = ${author}`);
    const validationResult = validateWithJsonSchema(author, AuthorRequestSchema);

    if (!validationResult.valid) {
        return logger.error(`>>>> authorService.create(), invalid daata: ${validationResult.errors}`)
    }

    const result = await createAuthor(author);

    if (!result) {
        logger.error(`>>>> authorService.create(), result = ${result}`);
        return "Author wasn\'t create"
    }
    return result
}