import { Document, model, Schema } from "mongoose";
import { Edition } from "../../features/printing-editions/api";

const EditionSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        minlength: 7
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    author_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    remove_book: {
        type: Boolean,
        required: true,
        default: false
    }
});

interface EditionModel extends Edition, Document {}
export default model<EditionModel>("Edition", EditionSchema);
