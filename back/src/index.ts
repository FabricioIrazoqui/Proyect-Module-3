import "reflect-metadata"
import app from "./server/server"
import { PORT } from "./config/envs"
import { AppDataSource } from "./config/data-source"

AppDataSource.initialize()
.then(res => {
    app.listen(PORT, () => {
        console.log(`Conectado al puerto ${PORT}`)
        
    })
})