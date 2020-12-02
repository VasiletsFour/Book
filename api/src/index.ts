import * as conf from "./config/config";
import express, { Application} from "express";
import authRoutes from "../src/features/auth/auth";
import bookRoutes from "./features/printing-editions/app"
import authorRoutes from './features/author/app'
import orderRoutes from "./features/orders/app";
import userRoutes from "./features/user/app";
import "./features/shared/db/db"
import morgan from "morgan"
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import { user } from "./features/user/user-controller";


const app: Application = express()
const port: Number = Number(conf.arr[0])

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser());
app.use(cors())

passport.serializeUser(function (user, done) {
    done(null, user)
})
app.use(passport.initialize())

passport.deserializeUser(function (obj, done) {
    done(null, obj)
})


app.use('/api/auth', authRoutes);
app.use('/books', bookRoutes)
app.use('/admin', authorRoutes)
app.use('/order', orderRoutes)
app.use('/admin', userRoutes)

app.listen(port, () => {
    console.log("server running in port" + " " + port)
});