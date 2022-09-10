// declare global {
//     namespace Express {
//         interface Request {
//             context: Context
//         }
//     }
// }
import app from "./config/express";
import "reflect-metadata"
import { config } from "./config/dotenv"
import { AppDataSource } from "./clients/orm/type-orm"
import { Context } from "vm";

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

app.listen(config.PORT, () => console.log(`http://localhost:${config.PORT}`))