import { isValidated } from "../../../helpers/validate/validate";
import { logger } from "../../utils/logger";
import { Login, User } from "../api";
import * as rpositore from "../repositories/repositorie";
import UserSchema from "../Shema/UserSchema.json";

export const signUp = async (user: User) => {
    logger.info(`>>>> userService.create() with: user = ${user}`);

    if (user.role) {
        logger.error(`register user, error: you cant create admin, user = ${JSON.stringify(user)}`);
        return { status: 400, message: { error: "you cant create admin" } };
    }

    const validate = isValidated(user, UserSchema);

    if (!validate.valid) {
        logger.error(`register user, error: ${validate.errors}, user = ${JSON.stringify(user)}`);
        return { status: 400, message: { error: validate.errors } };
    }

    return await rpositore.signUp(user);
};

export const signIn = async (user: Login) => {
    logger.info(`>>>> userService.login user = ${user}`);
    const validate = isValidated(user, UserSchema);

    if (!validate.valid) {
        logger.error(`register user, error: ${validate.errors}, user = ${JSON.stringify(user)}`);
        return { status: 400, message: { error: validate.errors } };
    }

    return await rpositore.signIn(user);
};
