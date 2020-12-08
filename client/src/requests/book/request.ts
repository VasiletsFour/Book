import {makeGetRequest  } from "../../api/api";

export const getBook = async(callBack:CallableFunction)=>{
    const result = await makeGetRequest("/book")
    
    callBack(result)
}