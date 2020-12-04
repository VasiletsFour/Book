import jwt from "jsonwebtoken";
import { Verify } from "./api";
import { config } from "../../config/config";

export const generateAccessToken = (userRole: string, userId: string) => {
    const payload = {
        id: userId,
        role: userRole,
        type: "access"
    };

    const options = { expiresIn: "6m" };

    return jwt.sign(payload, config.jwtKey, options);
};

export const generateRefreshToken = (userId: string) => {
    const payload = {
        id: userId,
        type: "refresh"
    };

    const options = { expiresIn: "48h" };

    return jwt.sign(payload, config.jwtKey, options);
};

export const tokenDecode = (token: string) => {
    const auth = token.replace(/Bearer /, "");
    const verify = <Verify>jwt.verify(auth, config.jwtKey);

    return verify
};
