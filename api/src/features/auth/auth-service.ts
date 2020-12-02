import { validateWithJsonSchema } from "../utils/validateWithJsonSchema";
import AuthRequestSchema from "./operations/AuthRequestSchema.json";
import { createUser } from "./saved-user";
import { sendingEmail } from "./helper/emailHelper";
import { logger } from "../utils/logger";

export async function create(user: any) {
    logger.info(`>>>> userService.create() with: user = ${user}`);
    const validationResult = validateWithJsonSchema(user, AuthRequestSchema);

    if (!validationResult.valid) {
        logger.error(`>>>> userService.create(), invalid daata: ${validationResult.errors}`)
    }

    const validEmail = sendingEmail(user.email)
    const resulValidEmail: any = typeof (validEmail)

    if (resulValidEmail === String) {
        return resulValidEmail
    }

    const result = await createUser(user);

    if (!result) {
        logger.error(`>>>> userService.create(), result = ${result}`);
        return "user wasn\'t create"
    }
    return result
}