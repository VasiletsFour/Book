import { isValidated } from "../../../helpers/validate/validate";
import { logger } from "../../utils/logger";
import { Login, SignUp } from "../api";
import * as rpositore from "../repositories/repositorie";
import SignInSchema from "../Shema/SignInSchema.json";
import SignUpSchema from "../Shema/SignUpSchema.json";

export const signUp = async (user: SignUp) => {
    logger.info(`>>>> userService.create() with: user = ${user}`);

    const validate = isValidated(user, SignUpSchema);

    if (!validate.valid) {
        logger.error(`register user, error: ${validate.errors}, user = ${JSON.stringify(user)}`);
        return { status: 400, message: { error: validate.errors } };
    }

    return await rpositore.signUp(user);
};

export const signIn = async (user: Login) => {
    logger.info(`>>>> userService.login user = ${user}`);
    const validate = isValidated(user, SignInSchema);
    
    if (!validate.valid) {
        logger.error(`register user, error: ${validate.errors}, user = ${JSON.stringify(user)}`);
        return { status: 400, message: { error: validate.errors } };
    }

    return await rpositore.signIn(user);
};
``