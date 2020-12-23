import {makeGetRequest, makePostRequest  } from "../../api/api";

export const getBooks = async(callBack:CallableFunction, query?:string)=>{
    const result = await makeGetRequest(`/book/${query?query:""}`)
    
    callBack(result)
}

export const getBook = async(callBack:CallableFunction, id:string)=>{
    const result = await makeGetRequest(`/book/${id}`)
    
    callBack(result)
}

export const postShoping = async(callBack:CallableFunction, data:Array<string>)=>{
    const result = await makePostRequest(`/book/shoping`, data)
    
    callBack(result)
}