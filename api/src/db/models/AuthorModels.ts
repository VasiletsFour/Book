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

interface AuthorModel extends Author, Document {}
export default model<AuthorModel>("Author", AuthorSchema);
