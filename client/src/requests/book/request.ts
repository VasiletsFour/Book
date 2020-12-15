import {makeGetRequest  } from "../../api/api";

export const getBook = async(callBack:CallableFunction, query?:string)=>{
    const result = await makeGetRequest(`/book/${query?query:""}`)
    
    callBack(result)
}