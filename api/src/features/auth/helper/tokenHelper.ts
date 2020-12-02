import jwt from "jsonwebtoken";
import * as conf from "../../../config/config";

const key:string = String(conf.arr[1])

export const generateAccessToken = (userId: string, userEmail:string, userRole:string) => {
    const payload = {
        id: userId,
        email:userEmail,
        role:userRole,
        type: "access"
    };

    const options: object = { expiresIn: "1m" }
    const tokenAccess: string = jwt.sign(payload, key, options)

    return tokenAccess
}

export const generateRefreshToken = (userId: string) => {
    const payload = {
        id: userId,
        type: "refresh"
    };

    const options: object = { expiresIn: "744h" };
    const tokenRefresh: string = jwt.sign(payload, key, options)

    return tokenRefresh
}
