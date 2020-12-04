import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { config } from "./config/config";
import connectDb from "./db/db/db";
import authRoutes from "./features/auth/routes";
import authorRoutes from './features/author/routes';
import bookRoutes from "./features/editions/routes";
import orderRoutes from "./features/orders/routes";
import userRoutes from "./features/user/routes";

const createServer = () => {
    try {
        const app = express();
        const port = config.port;
        
        connectDb();
        
        app.use(cors());
        app.use(morgan("dev"));
        app.use(bodyParser.json());
        
        app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*"); 
            res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type, authorization, X-Requested-With");
            res.setHeader("Access-Control-Expose-Headers", "*");

            next();
        });

        app.use('/api/auth', authRoutes);
        app.use('/api/author', authorRoutes)
        app.use('/api/book', bookRoutes)
        app.use('/api/order', orderRoutes)
        app.use('/api/user', userRoutes)

        app.listen(port, () => console.log(`Server run on port ${port}`));
    } catch (error) {
        console.log(error);
    }
};

createServer();
