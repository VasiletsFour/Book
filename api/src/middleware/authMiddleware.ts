import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import UserModel from "../db/models/UserModels";
import { Token } from "../helpers/token/api";
import { generateAccessToken, generateRefreshToken } from "../helpers/token/token";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader:any = await req.header("Authorization")
    const refHeader:any = await req.header("RefreshToken")
    const auth = authHeader.replace(/Bearer /, "");
    const ref = refHeader.replace(/Bearer /, "");

    jwt.verify(auth, config.jwtKey, async (err:Error, decode: Token) => {
        if (decode) {
            const user = await UserModel.findOne({ _id: decode["id"] });

            if (user) {
                return next();
            }
        }

        jwt.verify(ref, config.jwtKey, async (err:Error, decode: Token) => {
            if (decode) {
                const user = await UserModel.findOne({ _id: decode["id"] });

                if (user) {
                    const access = generateAccessToken(user["role"], user["_id"]);
                    const ref = generateRefreshToken(user["_id"]);

                    return res.status(200).send({ data: { newToken: { accessToken: access, refreshToken: ref } } });
                }
            }

            return res.status(401).send({ err: "please login again" });
        });
    });
};
