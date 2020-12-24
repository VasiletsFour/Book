import { Document, model, Schema } from "mongoose";
import { Author } from "../../features/author/api";

const AuthorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    remove_author: {
        type: Boolean,
        required: true,
        default: false
    }
});

AuthorSchema.set("toJSON", {
    transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret.remove_author;
        delete ret._id;
        delete ret.__v;
    }
}); 

interface AuthorModel extends Author, Document {}
export default model<AuthorModel>("Author", AuthorSchema);
