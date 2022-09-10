import app from "./config/express";
import "reflect-metadata"
import { config } from "./config/dotenv"
import { AppDataSource } from "./clients/orm/type-orm"

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

app.listen(config.PORT, () => console.log(`http://localhost:${config.PORT}`))