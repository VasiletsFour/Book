import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import UserModel from "../../db/models/UserModels";
import { Verify } from "../../helpers/token/api";

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const header:any = await req.header("Authorization")
    const auth = header.replace(/Bearer /, "");
    
    jwt.verify(auth, config.jwtKey, async (err:Error, decode: Verify) => {
        if (decode) {
            const user = await UserModel.findOne({ _id: decode["id"] });

            if (user === null || user?.role !== "admin") {
                return res.status(401).send({ err: "Account not verify" });
            }

            if (user && user.role === "admin") {
                return next();
            }
        }

        if (err) {
            return res.status(401).send({ err: "Refresh token" });
        }

        return res.status(401).send({ err: "please login again" });
    });
};
