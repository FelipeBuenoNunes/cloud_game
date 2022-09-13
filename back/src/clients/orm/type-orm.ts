import { DataSource } from "typeorm"
import { Users } from "./entity/User"
import { config } from "../../config/dotenv"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.POSTGRES_HOST,
    port: config.POSTGRES_PORT,
    username: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [Users],
    migrations: [],
    subscribers: [],
})
