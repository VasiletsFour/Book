import * as dotenv from "dotenv";

let path;

dotenv.config({ path: path });

export const config: any = {
    port: process.env.PORT,
    secret: process.env.SECRET,
    db: process.env.DBURL,
    jwtKey: process.env.JWTKEY
};
