export interface Author{
    name:string,
    remove_author:boolean
}

export interface Filter{
    page:number
    name?:string
}

export interface AuthorMap{
    _id:string
    name:string
}