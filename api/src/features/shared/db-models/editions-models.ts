import {Schema, model, Document} from "mongoose"
import { IAuthor } from "./author-models"

export interface IEditions extends Document{
    name:{type:string, unique:true},
    description:string,
    type:string,
    price:number,
    currency: string,
    author_id: [IAuthor['_id']],
    remove_book:boolean
}

const editionsSchema = new Schema({
    name:{
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    description:{
        type:String,
        required:true,
        minlength:7
    },
    type:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    author_id:{
        type:Schema.Types.ObjectId, 
        required: true
    },
    remove_book:{
        type:Boolean,
        required:true,
        default: false
    }
    
})

export default model<IEditions>("Editions", editionsSchema)