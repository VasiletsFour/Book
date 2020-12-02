import { validate } from "jsonschema";

export const isValidated = (value: any, schema: any) => {
    return validate(value, schema);
};
