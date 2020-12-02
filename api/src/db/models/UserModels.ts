import { Schema, model, Document } from "mongoose"
import {User  } from "../../features/auth/api";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    role:{
        type: String,
        required: true,
        default: "user"
    },
    remove_user:{
        type:Boolean,
        required:true,
        default: false
    }
})

interface UserModel extends User, Document {}
export default model<UserModel>("User", UserSchema);
