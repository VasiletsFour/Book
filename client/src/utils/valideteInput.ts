import { emailRegex } from "./regex";

export const validateEmail = (email: string, callBack: CallableFunction) => {
    const match = email.match(emailRegex);

    if (!match && email) {
        return callBack(true);
    }

    return callBack(false)
};

export const validateUserName = (pass: string, callBack: CallableFunction) =>
    pass.length <= 2 ? callBack(true) : callBack(false);

export const validatePass = (pass: string, callBack: CallableFunction) =>
    pass.length <= 5 ? callBack(true) : callBack(false);