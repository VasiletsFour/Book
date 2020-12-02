import jwt from "jsonwebtoken";
import { Token } from "./api";
import {config} from "../../config/config";

export const generateAccessToken = (userRole: string, userId: string) => {
    const payload:Token ={
        id:userId,
        role:userRole,
        type:"access"
    }

    const options = { expiresIn: "6m" };

    return jwt.sign(payload, config.jwtKey, options)
}

export const generateRefreshToken = (userId: string) => {
    const payload:Token ={
        id:userId,
        type:"refresh"
    }

    const options = { expiresIn: "48h" };

    return jwt.sign(payload, config.jwtKey, options)
}