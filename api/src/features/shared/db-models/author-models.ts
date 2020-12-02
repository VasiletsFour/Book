import { Schema, model, Document } from "mongoose"

export interface IAuthor extends Document{
    name:string,
    remove_author:boolean
}

const authorSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    remove_author:{
        type:Boolean,
        required:true,
        default: false
    }
})

export default model<IAuthor>('Author', authorSchema)
