import { Request, Response } from "express"
import jwt from "jsonwebtoken";
import {generateAccessToken, generateRefreshToken} from "./helper/tokenHelper";
import User from "../shared/db-models/user-models"
import * as conf from "../../config/config";

const key:string = String(conf.arr[1])

export const tokenValidation = async (req: Request, res: Response) => {
    const authHeader = req.header("auth-token");
    const refHeader = req.header("ref-token");
    

    if (!authHeader) {
        return res.status(401).send("access denide")
    };

    if (!refHeader) {
        return res.status(401).send("refresh denide")
    };

    if (authHeader && refHeader ) {

        try {
            jwt.verify(authHeader, key)
            res.send("all good")

        } catch (e) {

            if (e instanceof jwt.JsonWebTokenError) {

                try {
                    const user: any =  jwt.verify(refHeader, key);
                    const userFind:any = await User.findOne({ _id: user["id"] })
                    
                    const accessToken: string = generateAccessToken(userFind["_id"], userFind["email"],  userFind["role"])
                    const refreshToken: string = generateRefreshToken(userFind["id"])

                    res.json({ "authToken": accessToken, "refToken": refreshToken }).status(200)

                } catch (e) {
                    res.status(401).json('please signin again')
                }
            }
        };
    }
};


