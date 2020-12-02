import { validateWithJsonSchema } from "../../helpers/validate/validate";
import OrderRequestSchema from "./operations/OrderRequestSchema.json";
import { createOrder } from "./saved-order";
import { logger } from "../utils/logger";

export async function create(order: object) {
    logger.info(`>>>> bookService.create() with: book = ${order}`);
    const validationResult = validateWithJsonSchema(order, OrderRequestSchema);

    if (!validationResult.valid) {
        logger.error(`>>>> bookService.create(), invalid daata: ${validationResult.errors}`)
    }

    const result = await createOrder(order);

    if (!result) {
        logger.error(`>>>> bookService.create(), result = ${result}`);
        return "book wasn\'t create"
    }
    return result
}