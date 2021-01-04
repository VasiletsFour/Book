import bcrypt from "bcrypt";
import UserModel from "../../../db/models/UserModels";
import { generateAccessToken, generateRefreshToken } from "../../../helpers/token/token";
import { Login, SignUp } from "../api";

export const signUp = async (user: SignUp) => {
    try {
        const checkUser = await UserModel.findOne({ email: user.email });

        if (checkUser !== null) {
            return { status: 404, message: { error: "A user with this email already exists!" } };
        }

        const createUser = new UserModel(user);

        createUser.password = await bcrypt.hash(user.password, 10);
        // createUser.confirmToken = token.generateRefToken(user.email);

        // const message = `Confirm registration by clicking on the link:${process.env.URL + "/confirm?token=" + createUser.confirmToken
        //     }`;
        // email.emailHelper(user.email, message);

        await UserModel.create(createUser);

        return { status: 200, message: { data: "Create user" } };
    } catch (err) {
        return { status: 400, message: { error: err } };
    }
};

export const signIn = async ({ email, password }: Login) => {
    try {
        const user = await UserModel.findOne({ email: email });

        if (user === null) {
            return { status: 404, message: { error: "User not found" } };
        }

        const isPasswordMatching = await bcrypt.compare(password, user.password);

        if (isPasswordMatching) {
            const accessToken = generateAccessToken(user.role, user._id);
            const refreshToken = generateRefreshToken(user._id);

            return { status: 200, message: { data: { accessToken: accessToken, refreshToken: refreshToken } } };
        }

        return { status: 400, message: { error: "Invalid password!" } };
    } catch (err) {
        return { status: 400, message: { error: err } };
    }
};
