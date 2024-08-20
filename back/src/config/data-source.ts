import { DataSource } from "typeorm"
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "./envs"
import { Appointments } from "../entities/Appointments"
import { Credentials } from "../entities/Credentials"
import User from "../entities/Users"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    dropSchema: true,
    logging: true,
    entities: [User, Appointments, Credentials],
    subscribers: [],
    migrations: [],
})