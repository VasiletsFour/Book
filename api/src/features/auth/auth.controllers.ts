import { Request, Response } from "express";
import User from "../shared/db-models/user-models"
import { create } from "./auth-service";
import { generateAccessToken, generateRefreshToken } from "./helper/tokenHelper";
import * as conf from "../../config/config";

const key: string = String(conf.arr[1])

export const signup = async (req: Request, res: Response) => {
    const service = await create(req.body)

    res.send(service)
};

export const signin = async (req: Request, res: Response) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).json("Invalid email");
    }

    const correctPassword: boolean = await user.validatePassword(req.body.password);

    if (!correctPassword) {
        return res.status(400).json("Invalid Password");
    }

    const accessToken: string = generateAccessToken(user._id, user.email,  user.role)
    const refreshToken: string = generateRefreshToken(user._id)

    res.json({ "authToken": accessToken, "refToken": refreshToken }).status(200)
};


export const profile = (req: Request, res: Response) => {
    if (req.header("auth-token")) {
        res.send('good')
    }

    if (!req.header("auth-token")) {
        res.send("profile")
    }
};


