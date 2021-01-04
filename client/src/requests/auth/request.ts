import { makePostRequest } from "../../api/api";
import { SignIn, SignUp } from "./api";
import {setToken  } from "../../utils/storage";

export const postSignIn = async(data:SignIn)=>{
    const result = await makePostRequest(`/auth/signIn`, data)
    
    return setToken(result)
}

export const postSignUp = async(data:SignUp)=>{
    return await makePostRequest(`/auth/signUp`, data)
}