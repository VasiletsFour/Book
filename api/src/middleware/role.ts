import { Router, Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";
import * as conf from "../config/config";
import { token } from "morgan";

const key:string = String(conf.arr[1])

const admin = async function (req:Request, res:Response, next:NextFunction) {
    const authHeader = await req.header("auth-token");
    
    if (!authHeader) {
        return res.status(401).send("access denide")
    };

    const user: any =  await jwt.verify(authHeader, key)
    
    if (user['role'] != "true") {
        res.send(user).status(403)
    }

    if (user['role'] === "true") {
        next()
    }
}

export default admin