import { Router, Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import * as conf from "../config/config";
import { token } from "morgan";

const key:string = String(conf.arr[1])

export const admin = async function (req:Request, res:Response, next:NextFunction) {
    const auth = req.header("Authorization").replace(/Bearer /, "");
    

    jwt.verify(auth, process.env.SECRET_KEY, async (err, decode: Verify) => {
        if (decode) {
            const user = await UserModel.findOne({ _id: decode["_id"] });

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
}
