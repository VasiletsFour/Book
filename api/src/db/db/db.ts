import mongoose from "mongoose";
import * as conf from "../../config/config";

const connectDb = () => {
    mongoose
        .connect("mongodb://localhost/book", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .then((db) => console.log("Conected sucsesfully"))
        .catch((err) => console.log(err));
};

export default connectDb;
