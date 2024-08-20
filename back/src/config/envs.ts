import "dotenv/config"


export const PORT = process.env.PORT || process.env.PORT2 || process.env.PORT3
export const DB_USERNAME = process.env.DB_USERNAME
export const DB_NAME = process.env.DB_NAME
export const DB_HOST = process.env.DB_HOST
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_PORT = Number(process.env.DB_PORT)